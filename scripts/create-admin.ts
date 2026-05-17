import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function createAdminUser() {
  const email = 'kashif.latif2004@gmail.com';
  const password = 'AllahAllah786';
  const fullName = 'Kashif Latif';

  console.log('🔐 Creating admin user...\n');
  console.log(`   Email: ${email}`);

  try {
    // Step 1: Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('❌ Failed to list users:', listError.message);
      process.exit(1);
    }

    const existingUser = existingUsers?.users?.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      console.log('   User already exists with ID:', existingUser.id);

      // Step 2: Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', existingUser.id)
        .single();

      if (existingProfile) {
        console.log('   Profile exists with role:', existingProfile.role);

        if (existingProfile.role !== 'admin') {
          // Update role to admin
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', existingUser.id);

          if (updateError) {
            console.error('❌ Failed to update role:', updateError.message);
          } else {
            console.log('✅ Role updated to admin');
          }
        } else {
          console.log('✅ User is already an admin');
        }
      } else {
        // Create profile
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: existingUser.id,
            email: existingUser.email,
            full_name: existingUser.user_metadata?.full_name || fullName,
            role: 'admin',
          });

        if (insertError) {
          console.error('❌ Failed to create profile:', insertError.message);
        } else {
          console.log('✅ Admin profile created');
        }
      }

      console.log('\n🎉 Admin user is ready!');
      console.log('   Login at: /auth/login');
      console.log('   Admin panel: /admin/dashboard');
      process.exit(0);
    }

    // Step 3: Create new user via Admin API
    console.log('   Creating new user...');
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: 'admin',
      },
    });

    if (createError) {
      console.error('❌ Failed to create user:', createError.message);
      process.exit(1);
    }

    if (!newUser.user) {
      console.error('❌ User created but no user data returned');
      process.exit(1);
    }

    console.log('✅ User created with ID:', newUser.user.id);

    // Step 4: Create or update profile with admin role
    const { data: autoProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', newUser.user.id)
      .single();

    if (autoProfile) {
      // The trigger created a profile with default role 'customer', update it
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin', full_name: fullName })
        .eq('id', newUser.user.id);

      if (updateError) {
        console.error('❌ Failed to update profile role:', updateError.message);
      } else {
        console.log('✅ Profile role updated to admin');
      }
    } else {
      // No auto-created profile, insert one
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: newUser.user.id,
          email: newUser.user.email,
          full_name: fullName,
          role: 'admin',
        });

      if (insertError) {
        console.error('❌ Failed to create profile:', insertError.message);
      } else {
        console.log('✅ Admin profile created');
      }
    }

    console.log('\n🎉 Admin user created successfully!');
    console.log('   Email:    kashif.latif2004@gmail.com');
    console.log('   Password: AllahAllah786');
    console.log('   Role:     admin');
    console.log('\n   Login at: /auth/login');
    console.log('   Admin panel: /admin/dashboard');
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }

  process.exit(0);
}

createAdminUser();