"use client";

import { useEffect, useState } from "react";

import ProfileCard from "@/components/profile/ProfileCard";

import { getProfile } from "@/services/profileService";

export default function ProfilePage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadProfile() {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")!
        );

        const data =
          await getProfile(user.id);

        setProfile(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadProfile();

  }, []);

  if (loading) {

    return (

      <div className="flex h-full items-center justify-center">

        Loading Profile...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-6xl space-y-8">

      <h1 className="text-4xl font-bold">

        My Profile

      </h1>

      <ProfileCard
        profile={profile}
      />

    </div>

  );

}