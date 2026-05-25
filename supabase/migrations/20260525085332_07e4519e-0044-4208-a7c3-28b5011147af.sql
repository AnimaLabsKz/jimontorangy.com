
-- Revoke direct execution of trigger-only SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Remove broad listing policy on media bucket (direct URL access still works for public bucket)
DROP POLICY IF EXISTS "Public read media" ON storage.objects;
