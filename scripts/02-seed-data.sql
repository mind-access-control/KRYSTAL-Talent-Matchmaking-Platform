-- Este script debe ejecutarse DESPUÉS de crear usuarios en Supabase Auth
-- Los usuarios deben crearse con estos emails:
-- business1@example.com, business2@example.com, business3@example.com
-- talent1@example.com, talent2@example.com, talent3@example.com, talent4@example.com
-- admin@example.com

-- Insertar perfiles de negocios
INSERT INTO public.profiles (
    id, email, full_name, user_type, company_name, company_description, 
    industry_sector, website_url, avatar_url, company_logo_url
) 
SELECT 
    au.id, 
    au.email, 
    CASE 
        WHEN au.email = 'business1@example.com' THEN 'Sarah Johnson'
        WHEN au.email = 'business2@example.com' THEN 'Michael Chen'
        WHEN au.email = 'business3@example.com' THEN 'Emma Rodriguez'
    END,
    'business',
    CASE 
        WHEN au.email = 'business1@example.com' THEN 'StyleCo Fashion'
        WHEN au.email = 'business2@example.com' THEN 'TechVision Media'
        WHEN au.email = 'business3@example.com' THEN 'Glow Beauty Co'
    END,
    CASE 
        WHEN au.email = 'business1@example.com' THEN 'Leading fashion brand specializing in sustainable and trendy clothing for young professionals.'
        WHEN au.email = 'business2@example.com' THEN 'Digital marketing agency focused on tech startups and innovative brands.'
        WHEN au.email = 'business3@example.com' THEN 'Premium beauty and cosmetics brand with focus on natural ingredients.'
    END,
    CASE 
        WHEN au.email = 'business1@example.com' THEN 'Fashion'
        WHEN au.email = 'business2@example.com' THEN 'Technology'
        WHEN au.email = 'business3@example.com' THEN 'Beauty'
    END,
    CASE 
        WHEN au.email = 'business1@example.com' THEN 'https://styleco.com'
        WHEN au.email = 'business2@example.com' THEN 'https://techvision.com'
        WHEN au.email = 'business3@example.com' THEN 'https://glowbeauty.com'
    END,
    '/placeholder.svg?height=120&width=120',
    '/placeholder.svg?height=80&width=80'
FROM auth.users au
WHERE au.email IN ('business1@example.com', 'business2@example.com', 'business3@example.com');

-- Insertar perfiles de talento
INSERT INTO public.profiles (
    id, email, full_name, user_type, talent_category, bio, skills, languages,
    location, age, gender, hourly_rate, availability, avatar_url,
    instagram_followers, tiktok_followers, youtube_subscribers, total_engagement_rate
) 
SELECT 
    au.id, 
    au.email, 
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 'Sofia Rodriguez'
        WHEN au.email = 'talent2@example.com' THEN 'Marcus Thompson'
        WHEN au.email = 'talent3@example.com' THEN 'Aria Kim'
        WHEN au.email = 'talent4@example.com' THEN 'James Wilson'
    END,
    'talent',
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 'model'::talent_category_enum
        WHEN au.email = 'talent2@example.com' THEN 'influencer'::talent_category_enum
        WHEN au.email = 'talent3@example.com' THEN 'digital_artist'::talent_category_enum
        WHEN au.email = 'talent4@example.com' THEN 'photographer'::talent_category_enum
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 'Professional fashion model with 5+ years of experience in commercial and editorial photography. Passionate about sustainable fashion and body positivity.'
        WHEN au.email = 'talent2@example.com' THEN 'Lifestyle and fitness influencer helping people achieve their health goals. Certified personal trainer and nutrition coach.'
        WHEN au.email = 'talent3@example.com' THEN 'Creative digital artist specializing in brand illustrations, UI/UX design, and social media graphics. Love bringing brands to life through visual storytelling.'
        WHEN au.email = 'talent4@example.com' THEN 'Professional photographer with expertise in product, lifestyle, and portrait photography. 8 years of experience working with major brands.'
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN ARRAY['Fashion Photography', 'Commercial Modeling', 'Editorial Work', 'Social Media Content']
        WHEN au.email = 'talent2@example.com' THEN ARRAY['Fitness Content', 'Lifestyle Photography', 'Brand Partnerships', 'Video Production']
        WHEN au.email = 'talent3@example.com' THEN ARRAY['Digital Illustration', 'UI/UX Design', 'Brand Identity', 'Social Media Graphics', 'Animation']
        WHEN au.email = 'talent4@example.com' THEN ARRAY['Product Photography', 'Lifestyle Photography', 'Portrait Photography', 'Photo Editing', 'Studio Lighting']
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN ARRAY['English', 'Spanish']
        WHEN au.email = 'talent2@example.com' THEN ARRAY['English']
        WHEN au.email = 'talent3@example.com' THEN ARRAY['English', 'Korean']
        WHEN au.email = 'talent4@example.com' THEN ARRAY['English', 'French']
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 'Los Angeles, CA'
        WHEN au.email = 'talent2@example.com' THEN 'Miami, FL'
        WHEN au.email = 'talent3@example.com' THEN 'New York, NY'
        WHEN au.email = 'talent4@example.com' THEN 'San Francisco, CA'
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 25
        WHEN au.email = 'talent2@example.com' THEN 28
        WHEN au.email = 'talent3@example.com' THEN 24
        WHEN au.email = 'talent4@example.com' THEN 32
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 'female'
        WHEN au.email = 'talent2@example.com' THEN 'male'
        WHEN au.email = 'talent3@example.com' THEN 'female'
        WHEN au.email = 'talent4@example.com' THEN 'male'
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 500.00
        WHEN au.email = 'talent2@example.com' THEN 350.00
        WHEN au.email = 'talent3@example.com' THEN 75.00
        WHEN au.email = 'talent4@example.com' THEN 150.00
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 'Available weekdays and weekends'
        WHEN au.email = 'talent2@example.com' THEN 'Flexible schedule, prefer morning shoots'
        WHEN au.email = 'talent3@example.com' THEN 'Available Monday-Friday, remote work preferred'
        WHEN au.email = 'talent4@example.com' THEN 'Available for travel, flexible schedule'
    END,
    '/placeholder.svg?height=120&width=120',
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 45000
        WHEN au.email = 'talent2@example.com' THEN 125000
        WHEN au.email = 'talent3@example.com' THEN 8500
        WHEN au.email = 'talent4@example.com' THEN 15000
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 12000
        WHEN au.email = 'talent2@example.com' THEN 85000
        WHEN au.email = 'talent3@example.com' THEN 3200
        WHEN au.email = 'talent4@example.com' THEN 2500
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 0
        WHEN au.email = 'talent2@example.com' THEN 25000
        WHEN au.email = 'talent3@example.com' THEN 1500
        WHEN au.email = 'talent4@example.com' THEN 8000
    END,
    CASE 
        WHEN au.email = 'talent1@example.com' THEN 4.2
        WHEN au.email = 'talent2@example.com' THEN 6.8
        WHEN au.email = 'talent3@example.com' THEN 5.1
        WHEN au.email = 'talent4@example.com' THEN 3.9
    END
FROM auth.users au
WHERE au.email IN ('talent1@example.com', 'talent2@example.com', 'talent3@example.com', 'talent4@example.com');

-- Insertar perfil de administrador
INSERT INTO public.profiles (
    id, email, full_name, user_type, bio, skills, languages,
    location, age, gender, availability, avatar_url
) 
SELECT 
    au.id, 
    au.email, 
    'Admin User',
    'admin',
    'System administrator with full access to platform management.',
    ARRAY['System Administration', 'User Management', 'Analytics'],
    ARRAY['English'],
    'Remote',
    30,
    'other',
    'Full time',
    '/placeholder.svg?height=120&width=120'
FROM auth.users au
WHERE au.email = 'admin@example.com';

-- Insertar proyectos usando subconsultas para obtener business_id
INSERT INTO public.projects (
    business_id, title, description, campaign_type, industry_sector,
    requirements, skills_required, talent_types, budget_min, budget_max,
    duration_weeks, location, style_and_tone, status, deadline
) 
SELECT 
    p.id,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 'Summer Fashion Campaign 2024'
        WHEN p.email = 'business2@example.com' THEN 'Tech Startup Social Media Content'
        WHEN p.email = 'business3@example.com' THEN 'Beauty Product Photography'
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 'Looking for diverse models to showcase our new sustainable summer collection. The campaign will focus on outdoor lifestyle shots in natural settings.'
        WHEN p.email = 'business2@example.com' THEN 'Need creative content creators to produce engaging social media content for our AI startup launch. Looking for modern, tech-savvy creators.'
        WHEN p.email = 'business3@example.com' THEN 'Professional product photography needed for our new skincare line launch. Require high-quality studio shots and lifestyle imagery.'
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 'brand_campaign'::campaign_type_enum
        WHEN p.email = 'business2@example.com' THEN 'social_media_campaign'::campaign_type_enum
        WHEN p.email = 'business3@example.com' THEN 'product_launch'::campaign_type_enum
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 'Fashion'
        WHEN p.email = 'business2@example.com' THEN 'Technology'
        WHEN p.email = 'business3@example.com' THEN 'Beauty'
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN ARRAY['Outdoor shooting experience', 'Comfortable with natural lighting', 'Sustainable fashion advocacy']
        WHEN p.email = 'business2@example.com' THEN ARRAY['Tech industry knowledge', 'Social media expertise', 'Video editing skills']
        WHEN p.email = 'business3@example.com' THEN ARRAY['Studio photography experience', 'Product photography portfolio', 'Beauty industry knowledge']
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN ARRAY['Fashion Photography', 'Commercial Modeling', 'Outdoor Shoots']
        WHEN p.email = 'business2@example.com' THEN ARRAY['Social Media Content', 'Video Production', 'Brand Partnerships']
        WHEN p.email = 'business3@example.com' THEN ARRAY['Product Photography', 'Studio Lighting', 'Photo Editing']
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN ARRAY['model'::talent_category_enum]
        WHEN p.email = 'business2@example.com' THEN ARRAY['influencer'::talent_category_enum, 'content_creator'::talent_category_enum]
        WHEN p.email = 'business3@example.com' THEN ARRAY['photographer'::talent_category_enum]
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 3000.00
        WHEN p.email = 'business2@example.com' THEN 2000.00
        WHEN p.email = 'business3@example.com' THEN 1500.00
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 5000.00
        WHEN p.email = 'business2@example.com' THEN 4000.00
        WHEN p.email = 'business3@example.com' THEN 3000.00
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 4
        WHEN p.email = 'business2@example.com' THEN 6
        WHEN p.email = 'business3@example.com' THEN 3
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 'Los Angeles, CA'
        WHEN p.email = 'business2@example.com' THEN 'Remote'
        WHEN p.email = 'business3@example.com' THEN 'New York, NY'
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 'Natural, authentic, sustainable lifestyle. Bright and airy aesthetic with earth tones.'
        WHEN p.email = 'business2@example.com' THEN 'Modern, innovative, professional yet approachable. Clean minimalist aesthetic with tech vibes.'
        WHEN p.email = 'business3@example.com' THEN 'Clean, luxurious, spa-like aesthetic. Soft lighting with focus on natural beauty and wellness.'
    END,
    'active'::project_status_enum,
    CASE 
        WHEN p.email = 'business1@example.com' THEN NOW() + INTERVAL '6 weeks'
        WHEN p.email = 'business2@example.com' THEN NOW() + INTERVAL '8 weeks'
        WHEN p.email = 'business3@example.com' THEN NOW() + INTERVAL '4 weeks'
    END
FROM public.profiles p
WHERE p.user_type = 'business' AND p.email IN ('business1@example.com', 'business2@example.com', 'business3@example.com');

-- Insertar elementos de portafolio
INSERT INTO public.portfolio_items (
    talent_id, title, description, file_url, file_type, thumbnail_url, tags
) 
SELECT 
    p.id,
    CASE 
        WHEN p.email = 'talent1@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN 'Fashion Editorial Shoot'
        WHEN p.email = 'talent1@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 2 THEN 'Commercial Beauty Campaign'
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN 'Fitness Transformation Video'
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 2 THEN 'Lifestyle Brand Partnership'
        WHEN p.email = 'talent3@example.com' THEN 'Brand Identity Design'
        WHEN p.email = 'talent4@example.com' THEN 'Product Photography Portfolio'
    END,
    CASE 
        WHEN p.email = 'talent1@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN 'Editorial fashion photography for sustainable clothing brand'
        WHEN p.email = 'talent1@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 2 THEN 'Commercial beauty photography showcasing natural skincare products'
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN '30-day fitness challenge transformation video for health brand'
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 2 THEN 'Lifestyle content creation for wellness brand partnership'
        WHEN p.email = 'talent3@example.com' THEN 'Complete brand identity design for tech startup including logo and guidelines'
        WHEN p.email = 'talent4@example.com' THEN 'High-end product photography for luxury beauty brand'
    END,
    CASE 
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN '/placeholder.svg?height=400&width=600'
        ELSE '/placeholder.svg?height=600&width=400'
    END,
    CASE 
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN 'video'::file_type_enum
        ELSE 'image'::file_type_enum
    END,
    CASE 
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN '/placeholder.svg?height=200&width=300'
        ELSE '/placeholder.svg?height=300&width=200'
    END,
    CASE 
        WHEN p.email = 'talent1@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN ARRAY['fashion', 'editorial', 'sustainable', 'outdoor']
        WHEN p.email = 'talent1@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 2 THEN ARRAY['beauty', 'commercial', 'skincare', 'natural']
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 1 THEN ARRAY['fitness', 'transformation', 'health', 'motivation']
        WHEN p.email = 'talent2@example.com' AND row_number() OVER (PARTITION BY p.id ORDER BY p.id) = 2 THEN ARRAY['lifestyle', 'wellness', 'brand', 'partnership']
        WHEN p.email = 'talent3@example.com' THEN ARRAY['branding', 'logo', 'identity', 'tech']
        WHEN p.email = 'talent4@example.com' THEN ARRAY['product', 'photography', 'luxury', 'beauty']
    END
FROM public.profiles p
CROSS JOIN generate_series(1, CASE WHEN p.email IN ('talent1@example.com', 'talent2@example.com') THEN 2 ELSE 1 END) AS series
WHERE p.user_type = 'talent' AND p.email IN ('talent1@example.com', 'talent2@example.com', 'talent3@example.com', 'talent4@example.com');

-- Insertar preferencias de AI para negocios
INSERT INTO public.ai_preferences (
    user_id, skill_weight, experience_weight, budget_weight, 
    availability_weight, location_weight, min_match_score, max_suggestions
) 
SELECT 
    p.id,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 0.35
        WHEN p.email = 'business2@example.com' THEN 0.40
        WHEN p.email = 'business3@example.com' THEN 0.30
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 0.25
        WHEN p.email = 'business2@example.com' THEN 0.20
        WHEN p.email = 'business3@example.com' THEN 0.30
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 0.20
        WHEN p.email = 'business2@example.com' THEN 0.15
        WHEN p.email = 'business3@example.com' THEN 0.25
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 0.10
        WHEN p.email = 'business2@example.com' THEN 0.15
        WHEN p.email = 'business3@example.com' THEN 0.10
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 0.10
        WHEN p.email = 'business2@example.com' THEN 0.10
        WHEN p.email = 'business3@example.com' THEN 0.05
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 0.75
        WHEN p.email = 'business2@example.com' THEN 0.70
        WHEN p.email = 'business3@example.com' THEN 0.80
    END,
    CASE 
        WHEN p.email = 'business1@example.com' THEN 8
        WHEN p.email = 'business2@example.com' THEN 12
        WHEN p.email = 'business3@example.com' THEN 6
    END
FROM public.profiles p
WHERE p.user_type = 'business' AND p.email IN ('business1@example.com', 'business2@example.com', 'business3@example.com');

-- Insertar notificaciones de ejemplo
INSERT INTO public.notifications (
    user_id, title, message, type, action_url
) 
SELECT 
    p.id,
    CASE 
        WHEN p.email = 'talent1@example.com' THEN 'New Project Match!'
        WHEN p.email = 'talent2@example.com' THEN 'Profile Updated'
        WHEN p.email = 'business1@example.com' THEN 'New Applications'
    END,
    CASE 
        WHEN p.email = 'talent1@example.com' THEN 'You have a 92% match with "Summer Fashion Campaign 2024"'
        WHEN p.email = 'talent2@example.com' THEN 'Your profile has been successfully updated and is now live'
        WHEN p.email = 'business1@example.com' THEN 'You have 3 new applications for your Summer Fashion Campaign'
    END,
    CASE 
        WHEN p.email = 'talent1@example.com' THEN 'success'::notification_type_enum
        WHEN p.email = 'talent2@example.com' THEN 'info'::notification_type_enum
        WHEN p.email = 'business1@example.com' THEN 'info'::notification_type_enum
    END,
    CASE 
        WHEN p.email = 'talent1@example.com' THEN '/talent/project/details'
        WHEN p.email = 'talent2@example.com' THEN '/talent/profile/edit'
        WHEN p.email = 'business1@example.com' THEN '/business/project/suggestions'
    END
FROM public.profiles p
WHERE p.email IN ('talent1@example.com', 'talent2@example.com', 'business1@example.com');

-- Insertar eventos de analytics de ejemplo
INSERT INTO public.analytics_events (
    user_id, event_type, entity_type, entity_id, metadata
) 
SELECT 
    p.id,
    CASE 
        WHEN p.email = 'talent1@example.com' THEN 'profile_view'
        WHEN p.email = 'business1@example.com' THEN 'project_view'
        WHEN p.email = 'talent2@example.com' THEN 'message_sent'
    END,
    CASE 
        WHEN p.email = 'talent1@example.com' THEN 'profile'
        WHEN p.email = 'business1@example.com' THEN 'project'
        WHEN p.email = 'talent2@example.com' THEN 'message'
    END,
    p.id,
    CASE 
        WHEN p.email = 'talent1@example.com' THEN '{"viewer_type": "business", "source": "search_results"}'::jsonb
        WHEN p.email = 'business1@example.com' THEN '{"viewer_type": "talent", "match_score": 92}'::jsonb
        WHEN p.email = 'talent2@example.com' THEN '{"recipient_type": "business", "project_related": true}'::jsonb
    END
FROM public.profiles p
WHERE p.email IN ('talent1@example.com', 'business1@example.com', 'talent2@example.com');

-- Insertar logs de procesamiento de AI de ejemplo
INSERT INTO public.ai_processing_logs (
    process_type, entity_type, entity_id, status, processing_time_ms, metadata
) 
SELECT 
    'embedding_generation',
    'profile',
    p.id,
    'completed'::processing_status_enum,
    1250,
    '{"model": "CLIP", "embedding_dimension": 512, "content_type": "profile_text"}'::jsonb
FROM public.profiles p
WHERE p.user_type = 'talent'
LIMIT 1;

INSERT INTO public.ai_processing_logs (
    process_type, entity_type, entity_id, status, processing_time_ms, metadata
) 
SELECT 
    'matching',
    'project',
    pr.id,
    'completed'::processing_status_enum,
    3400,
    '{"matches_found": 8, "avg_similarity": 0.78, "processing_model": "vector_similarity"}'::jsonb
FROM public.projects pr
LIMIT 1;

-- Mensaje de confirmación
SELECT 'Datos de prueba insertados correctamente. Verifica que todos los usuarios estén creados en auth.users antes de ejecutar este script.' as message;
