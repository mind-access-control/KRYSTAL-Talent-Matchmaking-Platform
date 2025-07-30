-- Disable RLS temporarily to drop tables if policies depend on them
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_preferences DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_processing_logs DISABLE ROW LEVEL SECURITY;


-- Drop triggers first to avoid dependency issues
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
DROP TRIGGER IF EXISTS update_portfolio_updated_at ON public.portfolio_items;
DROP TRIGGER IF EXISTS update_ai_preferences_updated_at ON public.ai_preferences;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS calculate_match_score CASCADE;


-- Drop tables in reverse order of dependency to avoid foreign key errors
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.ai_preferences CASCADE;
DROP TABLE IF EXISTS public.analytics_events CASCADE;
DROP TABLE IF EXISTS public.ai_processing_logs CASCADE;
DROP TABLE IF EXISTS public.project_applications CASCADE;
DROP TABLE IF EXISTS public.portfolio_items CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;


-- Drop custom types if they exist (CASCADE is important if they are used in tables/functions)
DROP TYPE IF EXISTS user_type_enum CASCADE;
DROP TYPE IF EXISTS talent_category_enum CASCADE;
DROP TYPE IF EXISTS project_status_enum CASCADE;
DROP TYPE IF EXISTS campaign_type_enum CASCADE;
DROP TYPE IF EXISTS application_status_enum CASCADE;
DROP TYPE IF EXISTS notification_type_enum CASCADE;
DROP TYPE IF EXISTS message_status_enum CASCADE;
DROP TYPE IF EXISTS file_type_enum CASCADE;
DROP TYPE IF EXISTS processing_status_enum CASCADE;


-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create enum types
CREATE TYPE user_type_enum AS ENUM ('talent', 'business', 'admin');
CREATE TYPE talent_category_enum AS ENUM ('model', 'influencer', 'actor', 'photographer', 'content_creator', 'digital_artist', 'other');
CREATE TYPE project_status_enum AS ENUM ('draft', 'active', 'paused', 'completed', 'cancelled');
CREATE TYPE campaign_type_enum AS ENUM ('brand_campaign', 'product_launch', 'social_media_campaign', 'event_coverage', 'content_creation', 'other');
CREATE TYPE application_status_enum AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE notification_type_enum AS ENUM ('info', 'success', 'warning', 'error');
CREATE TYPE message_status_enum AS ENUM ('sent', 'delivered', 'read');
CREATE TYPE file_type_enum AS ENUM ('image', 'video', 'audio', 'document');
CREATE TYPE processing_status_enum AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    user_type user_type_enum NOT NULL,
    
    -- Common fields
    avatar_url TEXT,
    phone TEXT,
    location TEXT,
    timezone TEXT DEFAULT 'UTC',
    language_preference TEXT DEFAULT 'en',
    
    -- Talent-specific fields
    talent_category talent_category_enum,
    bio TEXT,
    skills TEXT[],
    languages TEXT[],
    age INTEGER,
    gender TEXT,
    height_cm INTEGER,
    weight_kg INTEGER,
    eye_color TEXT,
    hair_color TEXT,
    hourly_rate DECIMAL(10,2),
    availability TEXT,
    portfolio_url TEXT,
    
    -- Social media metrics
    instagram_handle TEXT,
    instagram_followers INTEGER DEFAULT 0,
    tiktok_handle TEXT,
    tiktok_followers INTEGER DEFAULT 0,
    youtube_handle TEXT,
    youtube_subscribers INTEGER DEFAULT 0,
    twitter_handle TEXT,
    twitter_followers INTEGER DEFAULT 0,
    total_engagement_rate DECIMAL(5,2) DEFAULT 0,
    
    -- Business-specific fields
    company_name TEXT,
    company_description TEXT,
    industry_sector TEXT,
    company_size TEXT,
    website_url TEXT,
    company_logo_url TEXT,
    
    -- AI embeddings for matching
    profile_embedding VECTOR(512),
    
    -- Metadata
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Basic project info
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    campaign_type campaign_type_enum NOT NULL,
    industry_sector TEXT,
    
    -- Requirements and specifications
    requirements TEXT[],
    skills_required TEXT[],
    talent_types talent_category_enum[],
    
    -- Budget and timeline
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    duration_weeks INTEGER,
    deadline TIMESTAMP WITH TIME ZONE,
    
    -- Location and logistics
    location TEXT,
    is_remote_friendly BOOLEAN DEFAULT FALSE,
    travel_required BOOLEAN DEFAULT FALSE,
    
    -- Creative direction
    style_and_tone TEXT,
    reference_images TEXT[],
    brand_guidelines_url TEXT,
    
    -- AI embeddings for matching
    project_embedding VECTOR(512),
    
    -- Status and metadata
    status project_status_enum DEFAULT 'draft',
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio items table
CREATE TABLE public.portfolio_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    talent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Content info
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type file_type_enum NOT NULL,
    thumbnail_url TEXT,
    file_size_bytes BIGINT,
    duration_seconds INTEGER, -- for videos/audio
    
    -- Metadata
    tags TEXT[],
    client_name TEXT,
    project_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- AI embeddings
    content_embedding VECTOR(512),
    
    -- Analytics
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project applications table
CREATE TABLE public.project_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    talent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Application details
    cover_letter TEXT,
    proposed_rate DECIMAL(10,2),
    availability_start DATE,
    availability_end DATE,
    
    -- AI matching score
    match_score DECIMAL(5,4), -- 0.0000 to 1.0000
    
    -- Status and timestamps
    status application_status_enum DEFAULT 'pending',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(project_id, talent_id)
);

-- Messages table for chat system
CREATE TABLE public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    
    -- Message content
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text', -- text, image, file, system
    file_url TEXT,
    
    -- Status
    status message_status_enum DEFAULT 'sent',
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Notification content
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type_enum DEFAULT 'info',
    action_url TEXT,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites table
CREATE TABLE public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    favorited_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    favorited_project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    
    -- Metadata
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure user can't favorite the same item twice
    UNIQUE(user_id, favorited_user_id),
    UNIQUE(user_id, favorited_project_id),
    
    -- Ensure at least one favorited item is specified
    CHECK (
        (favorited_user_id IS NOT NULL AND favorited_project_id IS NULL) OR
        (favorited_user_id IS NULL AND favorited_project_id IS NOT NULL)
    )
);

-- AI preferences table for businesses
CREATE TABLE public.ai_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    
    -- Matching weights (should sum to 1.0)
    skill_weight DECIMAL(3,2) DEFAULT 0.30,
    experience_weight DECIMAL(3,2) DEFAULT 0.25,
    budget_weight DECIMAL(3,2) DEFAULT 0.20,
    availability_weight DECIMAL(3,2) DEFAULT 0.15,
    location_weight DECIMAL(3,2) DEFAULT 0.10,
    
    -- Matching thresholds
    min_match_score DECIMAL(3,2) DEFAULT 0.70,
    max_suggestions INTEGER DEFAULT 10,
    
    -- Preferences
    prefer_verified_talent BOOLEAN DEFAULT TRUE,
    prefer_local_talent BOOLEAN DEFAULT FALSE,
    exclude_unavailable BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE public.analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Event details
    event_type TEXT NOT NULL, -- profile_view, project_view, application_sent, etc.
    entity_type TEXT, -- profile, project, portfolio_item, etc.
    entity_id UUID,
    
    -- Additional data
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI processing logs table
CREATE TABLE public.ai_processing_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Processing details
    process_type TEXT NOT NULL, -- embedding_generation, matching, etc.
    entity_type TEXT NOT NULL, -- profile, project, portfolio_item
    entity_id UUID NOT NULL,
    
    -- Status and performance
    status processing_status_enum DEFAULT 'pending',
    processing_time_ms INTEGER,
    error_message TEXT,
    
    -- Additional data
    metadata JSONB,
    
    -- Timestamps
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX idx_profiles_talent_category ON public.profiles(talent_category);
CREATE INDEX idx_profiles_location ON public.profiles(location);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);
CREATE INDEX idx_profiles_embedding ON public.profiles USING ivfflat (profile_embedding vector_cosine_ops);

CREATE INDEX idx_projects_business_id ON public.projects(business_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_campaign_type ON public.projects(campaign_type);
CREATE INDEX idx_projects_deadline ON public.projects(deadline);
CREATE INDEX idx_projects_embedding ON public.projects USING ivfflat (project_embedding vector_cosine_ops);

CREATE INDEX idx_portfolio_talent_id ON public.portfolio_items(talent_id);
CREATE INDEX idx_portfolio_file_type ON public.portfolio_items(file_type);
CREATE INDEX idx_portfolio_is_featured ON public.portfolio_items(is_featured);
CREATE INDEX idx_portfolio_embedding ON public.portfolio_items USING ivfflat (content_embedding vector_cosine_ops);

CREATE INDEX idx_applications_project_id ON public.project_applications(project_id);
CREATE INDEX idx_applications_talent_id ON public.project_applications(talent_id);
CREATE INDEX idx_applications_status ON public.project_applications(status);
CREATE INDEX idx_applications_match_score ON public.project_applications(match_score DESC);

CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_messages_project_id ON public.messages(project_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_favorited_user_id ON public.favorites(favorited_user_id);
CREATE INDEX idx_favorites_favorited_project_id ON public.favorites(favorited_project_id);

CREATE INDEX idx_analytics_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON public.analytics_events(created_at DESC);

CREATE INDEX idx_ai_logs_entity ON public.ai_processing_logs(entity_type, entity_id);
CREATE INDEX idx_ai_logs_status ON public.ai_processing_logs(status);
CREATE INDEX idx_ai_logs_created_at ON public.ai_processing_logs(started_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can view all profiles, but only edit their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Projects: Public for viewing, businesses can manage their own
CREATE POLICY "Projects are viewable by everyone" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Businesses can insert their own projects" ON public.projects
    FOR INSERT WITH CHECK (auth.uid() = business_id);

CREATE POLICY "Businesses can update their own projects" ON public.projects
    FOR UPDATE USING (auth.uid() = business_id);

CREATE POLICY "Businesses can delete their own projects" ON public.projects
    FOR DELETE USING (auth.uid() = business_id);

-- Portfolio items: Public for viewing, talent can manage their own
CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio_items
    FOR SELECT USING (true);

CREATE POLICY "Talent can manage their own portfolio" ON public.portfolio_items
    FOR ALL USING (auth.uid() = talent_id);

-- Applications: Visible to project owner and applicant
CREATE POLICY "Applications visible to involved parties" ON public.project_applications
    FOR SELECT USING (
        auth.uid() = talent_id OR 
        auth.uid() IN (SELECT business_id FROM public.projects WHERE id = project_id)
    );

CREATE POLICY "Talent can apply to projects" ON public.project_applications
    FOR INSERT WITH CHECK (auth.uid() = talent_id);

CREATE POLICY "Talent can update their applications" ON public.project_applications
    FOR UPDATE USING (auth.uid() = talent_id);

-- Messages: Only sender and recipient can see
CREATE POLICY "Messages visible to sender and recipient" ON public.messages
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Notifications: Users can only see their own
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

-- Favorites: Users can only see and manage their own
CREATE POLICY "Users can manage their own favorites" ON public.favorites
    FOR ALL USING (auth.uid() = user_id);

-- AI Preferences: Users can only see and manage their own
CREATE POLICY "Users can manage their own AI preferences" ON public.ai_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Analytics: Users can only see their own events
CREATE POLICY "Users can view their own analytics" ON public.analytics_events
    FOR SELECT USING (auth.uid() = user_id);

-- Admin policies for AI logs and analytics (Admins can see everything)
CREATE POLICY "Admins can view all AI processing logs" ON public.ai_processing_logs
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );

CREATE POLICY "Admins can view all analytics events" ON public.analytics_events
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
    );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON public.portfolio_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_preferences_updated_at BEFORE UPDATE ON public.ai_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate AI match score
CREATE OR REPLACE FUNCTION calculate_match_score(
    project_emb vector(512),
    talent_emb vector(512),
    skill_weight DECIMAL DEFAULT 0.3,
    social_followers INTEGER DEFAULT 0,
    location_match BOOLEAN DEFAULT false
) RETURNS DECIMAL AS $$
DECLARE
    similarity_score DECIMAL;
    social_score DECIMAL;
    location_score DECIMAL;
    final_score DECIMAL;
BEGIN
    -- Calculate cosine similarity (convert to 0-1 scale)
    similarity_score := (1 + (project_emb <=> talent_emb)) / 2;
    
    -- Social media score (normalized)
    social_score := LEAST(social_followers / 100000.0, 1.0); -- Normalize based on 100k followers
    
    -- Location bonus
    location_score := CASE WHEN location_match THEN 0.1 ELSE 0.0 END;
    
    -- Weighted final score
    final_score := (similarity_score * skill_weight) + 
                   (social_score * 0.2) + -- Example weight for social score
                   location_score;
    
    RETURN LEAST(final_score * 100, 100); -- Convert to percentage, cap at 100
END;
$$ LANGUAGE plpgsql;
