-- UniCoreERP Core Data Seed V2
-- Seeds default Roles, Permissions, Default Tenant, Sample University, Main Campus, and Super Admin user

-- Roles
INSERT INTO roles (id, name, display_name, description, is_system_role) VALUES
('r-super-admin', 'ROLE_SUPER_ADMIN', 'Super Admin', 'System-wide Super Administrator', TRUE),
('r-univ-admin', 'ROLE_UNIVERSITY_ADMIN', 'University Admin', 'University Level Administrator', TRUE),
('r-chancellor', 'ROLE_CHANCELLOR', 'Chancellor', 'University Chancellor', TRUE),
('r-vc', 'ROLE_VICE_CHANCELLOR', 'Vice Chancellor', 'University Vice Chancellor', TRUE),
('r-registrar', 'ROLE_REGISTRAR', 'Registrar', 'Academic & Administration Registrar', TRUE),
('r-dean', 'ROLE_DEAN', 'Dean', 'Faculty / School Dean', TRUE),
('r-hod', 'ROLE_HOD', 'Head of Department', 'Department Head', TRUE),
('r-professor', 'ROLE_PROFESSOR', 'Professor', 'Faculty Professor', TRUE),
('r-student', 'ROLE_STUDENT', 'Student', 'Enrolled University Student', TRUE),
('r-parent', 'ROLE_PARENT', 'Parent / Guardian', 'Parent or Legal Guardian', TRUE),
('r-admission-officer', 'ROLE_ADMISSION_OFFICER', 'Admission Officer', 'Student Admission Management', TRUE),
('r-accountant', 'ROLE_ACCOUNTANT', 'Accountant / Finance', 'Finance and Fee Management', TRUE),
('r-exam-officer', 'ROLE_EXAM_OFFICER', 'Controller of Examination', 'Examinations & Grading Management', TRUE),
('r-librarian', 'ROLE_LIBRARIAN', 'Librarian', 'Library & Books Management', TRUE),
('r-warden', 'ROLE_HOSTEL_WARDEN', 'Hostel Warden', 'Hostel Facilities Management', TRUE),
('r-transport', 'ROLE_TRANSPORT_MANAGER', 'Transport Manager', 'Fleet & Bus Route Management', TRUE),
('r-hr', 'ROLE_HR_MANAGER', 'HR Manager', 'Employee Payroll & HR Management', TRUE),
('r-placement', 'ROLE_PLACEMENT_OFFICER', 'Placement Officer', 'Corporate Placement & Internships', TRUE),
('r-it-admin', 'ROLE_IT_ADMIN', 'IT Administrator', 'IT & Systems Management', TRUE);

-- Permissions
INSERT INTO permissions (id, code, module, action, description) VALUES
('p-univ-read', 'UNIVERSITY_READ', 'UNIVERSITY', 'READ', 'View university details'),
('p-univ-write', 'UNIVERSITY_WRITE', 'UNIVERSITY', 'WRITE', 'Create/Edit university details'),
('p-user-read', 'USER_READ', 'USER', 'READ', 'View users'),
('p-user-write', 'USER_WRITE', 'USER', 'WRITE', 'Create/Edit users'),
('p-adm-read', 'ADMISSION_READ', 'ADMISSION', 'READ', 'View admissions'),
('p-adm-write', 'ADMISSION_WRITE', 'ADMISSION', 'WRITE', 'Manage admissions'),
('p-stu-read', 'STUDENT_READ', 'STUDENT', 'READ', 'View student records'),
('p-stu-write', 'STUDENT_WRITE', 'STUDENT', 'WRITE', 'Manage student records'),
('p-fee-read', 'FINANCE_READ', 'FINANCE', 'READ', 'View fee records'),
('p-fee-write', 'FINANCE_WRITE', 'FINANCE', 'WRITE', 'Manage fee records & receipts'),
('p-exam-read', 'EXAM_READ', 'EXAMINATION', 'READ', 'View exam schedules & marks'),
('p-exam-write', 'EXAM_WRITE', 'EXAMINATION', 'WRITE', 'Manage exams, marks & results');

-- Seed Default Tenant
INSERT INTO tenants (id, tenant_code, name, status) VALUES
('t-default-001', 'TENANT-UNICORE', 'UniCore Global Enterprise', 'ACTIVE');

-- Seed Default University
INSERT INTO universities (id, tenant_id, code, name, tagline, contact_email, contact_phone, website, status) VALUES
('u-apex-001', 't-default-001', 'APEX-UNIV', 'Apex Global University', 'Excellence in Education & Innovation', 'admin@apexuniversity.edu', '+1-800-555-0199', 'https://apexuniversity.edu', 'ACTIVE');

-- Seed Main Campus
INSERT INTO campuses (id, university_id, code, name, address, city, state, country, is_main, status) VALUES
('c-main-001', 'u-apex-001', 'CAMPUS-MAIN', 'Apex Main Campus', '100 University Boulevard', 'Tech City', 'State', 'USA', TRUE, 'ACTIVE');

-- Seed Super Admin User (password: admin123)
-- BCrypt for 'admin123': $2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.85nJ3eF09uG/W09tN3vXi
INSERT INTO users (id, tenant_id, university_id, campus_id, username, email, password, first_name, last_name, phone_number, user_type, status) VALUES
('usr-super-admin', 't-default-001', 'u-apex-001', 'c-main-001', 'superadmin', 'superadmin@unicoreerp.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.85nJ3eF09uG/W09tN3vXi', 'System', 'SuperAdmin', '+1-800-000-0000', 'SUPER_ADMIN', 'ACTIVE');

-- Assign Super Admin Role
INSERT INTO user_roles (user_id, role_id) VALUES
('usr-super-admin', 'r-super-admin');
