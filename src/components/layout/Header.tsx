
"use client";

import { useEffect, useState } from "react";

export default function Header() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }

  }, []);

  return (

    <header className="flex items-center justify-between border-b bg-white px-10 py-5">

      <div>

        <h2 className="text-2xl font-bold">
          Welcome back 👋
        </h2>

        <p className="text-gray-500">
          Manage your investments smarter.
        </p>

      </div>

      <div className="text-right">

        <p className="font-semibold">

          {user?.name ?? ""}

        </p>

        <p className="text-sm text-gray-500">

          {user?.email ?? ""}

        </p>

      </div>

    </header>

  );

}