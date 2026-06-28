"use client";

interface Props {
  left: Record<string, number>;
  right: Record<string, number>;
}

export default function AllocationComparison({
  left,
  right,
}: Props) {

  const categories = Array.from(
    new Set([
      ...Object.keys(left),
      ...Object.keys(right),
    ])
  );

  return (

    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Category Allocation

      </h2>

      <div className="space-y-6">

        {categories.map((category) => {

          const leftValue =
            left[category] || 0;

          const rightValue =
            right[category] || 0;

          const total =
            leftValue + rightValue || 1;

          return (

            <div
              key={category}
            >

              <div className="mb-2 flex justify-between">

                <span className="font-medium">
                  {category}
                </span>

                <span className="text-sm text-gray-500">
                  ₹
                  {leftValue.toLocaleString(
                    "en-IN"
                  )}
                  {"  vs  "}
                  ₹
                  {rightValue.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="flex h-4 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="bg-blue-600"
                  style={{
                    width: `${
                      (leftValue / total) *
                      100
                    }%`,
                  }}
                />

                <div
                  className="bg-green-500"
                  style={{
                    width: `${
                      (rightValue / total) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
}