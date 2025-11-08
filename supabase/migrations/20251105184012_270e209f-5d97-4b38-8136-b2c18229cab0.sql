-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('student', 'faculty');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  marks INTEGER CHECK (marks >= 0 AND marks <= 100),
  attendance INTEGER CHECK (attendance >= 0 AND attendance <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create messages table (faculty sends to students)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own role during signup"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subjects
CREATE POLICY "Students can view their own subjects"
  ON public.subjects FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Faculty can view all subjects"
  ON public.subjects FOR SELECT
  USING (public.has_role(auth.uid(), 'faculty'));

CREATE POLICY "Students can update their own subjects"
  ON public.subjects FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Faculty can update all subjects"
  ON public.subjects FOR UPDATE
  USING (public.has_role(auth.uid(), 'faculty'));

CREATE POLICY "Students can insert their own subjects"
  ON public.subjects FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Faculty can insert subjects for any student"
  ON public.subjects FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'faculty'));

CREATE POLICY "Faculty can delete subjects"
  ON public.subjects FOR DELETE
  USING (public.has_role(auth.uid(), 'faculty'));

-- RLS Policies for messages
CREATE POLICY "Students can view messages sent to them"
  ON public.messages FOR SELECT
  USING (auth.uid() = to_user_id);

CREATE POLICY "Faculty can view all messages"
  ON public.messages FOR SELECT
  USING (public.has_role(auth.uid(), 'faculty'));

CREATE POLICY "Faculty can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'faculty'));

CREATE POLICY "Students can update read status on their messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = to_user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at
  BEFORE UPDATE ON public.subjects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;