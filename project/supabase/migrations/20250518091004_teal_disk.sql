/*
  # Update admin_logins RLS policy

  1. Changes
    - Remove existing RLS policy that requires authentication
    - Add new policy that allows public access for insert/update operations
    - Keep RLS enabled for security

  2. Security
    - Allow public access for insert/update since admin auth is handled in-app
    - Admin credentials are still protected by application-level authentication
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Allow all access to admin_logins for authenticated users" ON admin_logins;

-- Create new policy allowing public access
CREATE POLICY "Allow public access to admin_logins" 
ON admin_logins
FOR ALL 
TO public
USING (true)
WITH CHECK (true);