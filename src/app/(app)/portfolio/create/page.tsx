import PortfolioForm from "@/components/portfolio/PortfolioForm";

export default function CreatePortfolioPage() {

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">

          Create Portfolio

        </h1>

        <p className="mt-2 text-gray-600">

          Add mutual funds and analyze your portfolio.

        </p>

      </div>

      <PortfolioForm />

    </div>

  );

}