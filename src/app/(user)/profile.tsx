import { View, Text } from 'react-native'
import React from 'react'
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase';

const Profile = () => {
  return (
    <View>
      <Button text="Sign out" onPress={async () => await supabase.auth.signOut()} />

    </View>
  );
}

export default Profile