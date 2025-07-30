-- Query para verificar usuarios creados en Supabase Auth
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- Query para verificar perfiles creados
SELECT id, email, full_name, user_type, created_at 
FROM public.profiles 
ORDER BY created_at DESC;

-- Query para contar registros por tabla
SELECT 
    'profiles' as table_name, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 
    'projects' as table_name, COUNT(*) as count FROM public.projects
UNION ALL
SELECT 
    'portfolio_items' as table_name, COUNT(*) as count FROM public.portfolio_items
UNION ALL
SELECT 
    'notifications' as table_name, COUNT(*) as count FROM public.notifications;
