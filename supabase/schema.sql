-- Staff Members
create table if not exists staff_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  subject text,
  bio text,
  photo_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- News Posts
create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  excerpt text,
  image_url text,
  published_date date not null,
  category text check (category in ('Academics','Admissions','Sports','Events','Facilities','Other')),
  created_at timestamptz default now()
);

-- Gallery Photos
create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  category text check (category in ('Campus','Events','Sports','Academics','Arts','Other')),
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Admission Applications
create table if not exists admission_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_name text not null,
  date_of_birth date,
  gender text check (gender in ('Male','Female')),
  level text not null check (level in ('Nursery','Primary','Secondary')),
  parent_name text not null,
  phone text not null,
  email text not null,
  message text,
  status text default 'Pending' check (status in ('Pending','Reviewed','Accepted','Rejected')),
  created_at timestamptz default now()
);

-- Facilities
create table if not exists facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  image_url text,
  icon_name text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  quote text not null,
  child_level text check (child_level in ('Nursery','Primary','Secondary')),
  photo_url text,
  featured boolean default true,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Enable RLS (Row Level Security)
alter table staff_members enable row level security;
alter table news_posts enable row level security;
alter table gallery_photos enable row level security;
alter table facilities enable row level security;
alter table testimonials enable row level security;
alter table admission_applications enable row level security;

-- Public read policies
create policy "Public read staff" on staff_members for select using (true);
create policy "Public read news" on news_posts for select using (true);
create policy "Public read gallery" on gallery_photos for select using (true);
create policy "Public read facilities" on facilities for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);

-- Applications policy
create policy "Public insert applications" on admission_applications for insert with check (true);

-- Admin policies
create policy "Admins manage staff" on staff_members for all using (auth.role() = 'authenticated');
create policy "Admins manage news" on news_posts for all using (auth.role() = 'authenticated');
create policy "Admins manage gallery" on gallery_photos for all using (auth.role() = 'authenticated');
create policy "Admins manage facilities" on facilities for all using (auth.role() = 'authenticated');
create policy "Admins manage testimonials" on testimonials for all using (auth.role() = 'authenticated');
create policy "Admins read applications" on admission_applications for select using (auth.role() = 'authenticated');

-- Seed Data

-- Staff
INSERT INTO staff_members (name, role, subject, bio, display_order) VALUES
('Mr. Musa Bulus Isa', 'Principal', 'Geography', 'Over 10 years of experience in education leadership and school management. Mr. Bulus is the visionary head of Triton International School.', 1),
('Mrs. Zulaihatu Musa Muhammed', 'Head of Primary School', 'Economics', 'A passionate educator dedicated to building strong foundations in young learners. Over 10 years in primary education.', 2),
('Mr. Apim Godwin Sokowam', 'Teacher', 'Mathematics Teacher', 'He makes solving Maths very easy and exciting.', 3),
('Mrs. Favour Kachie Kpheik', 'Teacher', 'English Language Teacher & SSS 1 Class Teacher', 'Passionate about making English engaging and enjoyable. She helps students build confidence and achieve outstanding WAEC results.', 4),
('Mr. Haruna M. Babale', 'Secretary', 'Administration', 'The welcoming face of our school, ensuring seamless communication and efficient day-to-day administration.', 5),
('Mrs. Yadang James', 'Teacher', 'Pre Nursery Teacher', 'Creates a safe, joyful, and nurturing environment where young learners build confidence through play and discovery.', 6),
('Mrs. Ruth Oyoh Ekaete', 'Teacher', 'Nursery 1 Teacher', 'Nurtures curiosity and early learning through engaging, play-based experiences that inspire young minds.', 7),
('Mrs. Tawakaltu Usama Olaoye', 'Teacher', 'Nursery 2 Teacher', 'Builds strong foundations in literacy, numeracy, and social skills through creative and interactive learning.', 8),
('Mrs. Ta''aziya Rufus', 'Teacher', 'Primary 1 Class Teacher', 'Guides pupils with patience and enthusiasm, helping them develop confidence and a lifelong love for learning.', 9),
('Mrs. Judith Ibrahim Aliyu', 'Teacher', 'Primary 2 Class Teacher', 'Encourages academic growth and creativity while fostering independence and critical thinking.', 10),
('Mrs. Halimat Abdullahi', 'Teacher', 'Primary 3 Class Teacher', 'Dedicated to helping every learner reach their full potential through engaging and student-centered instruction.', 11),
('Mrs. Sheila Bala Madaki', 'Teacher', 'Primary 4 Class Teacher', 'Inspires excellence by creating a supportive classroom where curiosity, discipline, and achievement thrive.', 12),
('Mr. Ezekiel Ishaku', 'Teacher', 'Primary 5 Class Teacher', 'Committed to preparing pupils for future success through high academic standards, mentorship, and character development.', 13),
('Mr. Ransome Tariyah Giroh', 'Teacher', 'JSS 1 Class Teacher', 'Guides students through a smooth transition into secondary education, building confidence and academic excellence.', 14),
('Mrs. Lamba John Hyeladzira', 'Teacher', 'JSS 2 Class Teacher', 'Encourages critical thinking and academic growth through engaging, learner-centered instruction.', 15),
('Mrs. Ruth John Kwaha', 'Teacher', 'JSS 3 Class Teacher', 'Prepares students for outstanding BECE performance while fostering discipline and lifelong learning.', 16),
('Mr. Isaac Iornem Saautaver', 'Teacher', 'SSS 2 Class Teacher', 'Challenges students to excel through innovative teaching, critical thinking, and consistent academic support.', 17),
('Mrs. Nafisat Edibo', 'Teacher', 'Chemistry Teacher & SSS 3 Class Teacher', 'Dedicated to preparing students for exceptional WAEC performance and success beyond the classroom.', 18)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO testimonials (parent_name, quote, child_level, featured, display_order) VALUES
('Mrs. Adaeze Okonkwo', 'Triton International School has been a blessing for our family. My son transformed from a shy child into a confident, curious learner. The teachers genuinely care.', 'Primary', true, 1),
('Alhaji Suleiman Bello', 'We were looking for a school that would prepare our daughter for university, and Triton delivered beyond our expectations. She scored distinctions in her WAEC.', 'Secondary', true, 2),
('Mrs. Grace Danjuma', 'From the moment I walked through the gates, I knew this was the right place. The Nursery teachers are so patient and loving with the little ones.', 'Nursery', true, 3)
ON CONFLICT DO NOTHING;

-- News Posts
INSERT INTO news_posts (title, excerpt, content, published_date, category, image_url) VALUES
('Triton Students Visit to NAS Library & Museum', 'Students along with the Chairman, Principal, Director and Teacher of the TIS visited the TY Danjuma Science Museum.', 'Triton International School students were invited to witness the launching of the TY Danjuma Science Museum and Library for the National Academy of Science.', '2026-06-29', 'Academics', 'https://i.ibb.co/Y7CrJSXz/TY-DANJUMA-SCIENCE-MUSEUEM.jpg'),
('DG NBBRI and Prof. Matawal (FMR. DG NBBRI) at TIS', 'The Present DG and Past Immediate DG of NBBRI paid a visit to Triton International School.', 'The Present DG and Past Immediate DG of NBBRI paid a visit to Triton International School and advised the students on the importance and uses of studying Science and Engineering.', '2026-06-29', 'Other', 'https://i.ibb.co/7dGhVL1X/a651e32a-b5e8-4f0c-b3c7-d9122aff950a.jpg'),
('Annual Children''s Day', 'Students, teachers, and parents came together for a colourful Children''s Day celebration featuring athletics, football, relays, and much more.', 'Triton International School''s Annual Children''s Day was a spectacular success!', '2026-06-29', 'Events', 'https://i.ibb.co/zh6n9K2c/childrens-day.jpg')
ON CONFLICT DO NOTHING;

-- Gallery
INSERT INTO gallery_photos (title, image_url, category, display_order) VALUES
('School Surrounding', 'https://i.ibb.co/zWPWYJBf/791a25a4-ee47-4234-8b25-00103a202a99.jpg', 'Campus', 1),
('School Nursery Section', 'https://i.ibb.co/23THwf9p/4dba11db-3992-42fb-9a2a-7d40c643211f.jpg', 'Campus', 2),
('School Primary Section', 'https://i.ibb.co/xq9tdHcZ/IMG-6610.jpg', 'Campus', 3),
('School Primary Section', 'https://i.ibb.co/rGtrk7Lf/IMG-6605.jpg', 'Campus', 4),
('Administration Block', 'https://i.ibb.co/qMSFCvRv/IMG-6607.jpg', 'Campus', 5),
('Secondary Section Entrance', 'https://i.ibb.co/Tpb6W5p/IMG-6611.jpg', 'Campus', 6),
('Secondary Section', 'https://i.ibb.co/Z6fbGrBF/IMG-6613.jpg', 'Campus', 7),
('Secondary Section', 'https://i.ibb.co/FkqQsjpJ/IMG-6614.jpg', 'Campus', 8),
('Secondary Section', 'https://i.ibb.co/45cXH39/IMG-6615.jpg', 'Campus', 9),
('Secondary Section', 'https://i.ibb.co/MDktqZGr/03979579-2-E25-4-AF9-94-E1-4-CF7-E10-C98-B3.jpg', 'Campus', 10),
('Secondary Section', 'https://i.ibb.co/SwX1qnWh/208-F75-B9-0261-4942-87-D4-C5-D866063-A14.jpg', 'Campus', 11),
('Secondary Section', 'https://i.ibb.co/xSKrK2zV/480-C96-EC-D10-A-45-F4-B870-C32729-EA2-F0-D.jpg', 'Campus', 12),
('Students Excursion to the National Park and Zoo', 'https://i.ibb.co/3Yk4JYBJ/zoo.jpg', 'Events', 13),
('Pupils in their Classroom', 'https://i.ibb.co/qF2bYS8f/IMG-6631.jpg', 'Academics', 14),
('Students Playing Basketball', 'https://i.ibb.co/hRZg2KgW/IMG-6597.jpg', 'Sports', 15),
('Students Playing Basketball', 'https://i.ibb.co/qFjmbnTy/IMG-6602.jpg', 'Sports', 16),
('Football Team with Visiting School', 'https://i.ibb.co/wZy7hhNT/footballteam-primary.jpg', 'Sports', 17),
('Primary Pupils on Picnic Day', 'https://i.ibb.co/zgxwvxz/primary-puils-picnic-day.jpg', 'Events', 18),
('Principal with Students on Old School Day', 'https://i.ibb.co/y11GSPm/Principal-w-Students-Old-school-day.jpg', 'Arts', 19),
('Old School Day', 'https://i.ibb.co/b88sKyg/Oldschool1.jpg', 'Arts', 20),
('Old School Day', 'https://i.ibb.co/8nvsNLRK/Oldschool2.jpg', 'Arts', 21),
('Students pose for picture on Old School', 'https://i.ibb.co/dsr9JHZ7/Oldschool3.jpg', 'Arts', 22)
ON CONFLICT DO NOTHING;

-- Facilities
INSERT INTO facilities (name, description, image_url, display_order) VALUES
('Computer Lab', 'Students in the Computer Lab gaining hands-on ICT experience.', 'https://i.ibb.co/bM39sXvb/EF98-E12-E-1-D1-A-4-F92-A60-A-142964-AA8-EFA.jpg', 1),
('Computer Lab', 'Primary pupils and their teacher pose for a photograph in the school laboratory.', 'https://i.ibb.co/Fd8pxtD/IMG-6626.jpg', 2)
ON CONFLICT DO NOTHING;
