"use client";

interface Props {
  profile: {
    name: string;
    email: string;
    portfolios: number;
    goals: number;
    totalInvestment: number;
  };
}

export default function ProfileCard({
  profile,
}: Props) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">

          {profile.name.charAt(0).toUpperCase()}

        </div>

        <h1 className="text-3xl font-bold">

          {profile.name}

        </h1>

        <p className="mt-2 text-gray-500">

          {profile.email}

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-slate-100 p-5 text-center">

          <p className="text-sm text-gray-500">

            Portfolios

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {profile.portfolios}

          </h2>

        </div>

        <div className="rounded-xl bg-slate-100 p-5 text-center">

          <p className="text-sm text-gray-500">

            Goals

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {profile.goals}

          </h2>

        </div>

        <div className="rounded-xl bg-slate-100 p-5 text-center">

          <p className="text-sm text-gray-500">

            Investment

          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-600">

            ₹
            {profile.totalInvestment.toLocaleString(
              "en-IN"
            )}

          </h2>

        </div>

      </div>

    </div>

  );

}