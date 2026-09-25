
"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";

export default function ChartsPage() {
  const revenueData = [42, 58, 48, 72, 64, 82];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <AdminSidebar />

      <div className="lg:ml-64">
        <AdminTopbar />

        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-500">
              Analytics
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Charts
            </h1>

            <p className="mt-2 text-gray-500">
              Visualize revenue, channels, and operating performance.
            </p>
          </div>

          {/* Revenue Trend */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Revenue Trend
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monthly revenue performance across the workspace.
              </p>
            </div>

            {/* Chart */}
            <div className="mt-8">
              <div className="flex h-72 items-end gap-2 border-b border-gray-200 px-2">
                {revenueData.map((height, index) => (
                  <div
                    key={months[index]}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div
                      className="w-full max-w-20 rounded-t-lg bg-gray-900"
                      style={{ height: `${height}%` }}
                    />

                    <span className="text-xs font-medium text-gray-500">
                      {months[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Channel Mix */}
          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Channel Mix
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Revenue contribution by source.
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
              {/* Circle */}
              <div className="flex justify-center">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[42px] border-gray-900">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">
                      68%
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Total share
                    </p>
                  </div>
                </div>
              </div>

              {/* Channel List */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Direct sales
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Primary revenue channel
                    </p>
                  </div>

                  <span className="text-lg font-bold text-gray-900">
                    42%
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Marketplace
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Marketplace orders
                    </p>
                  </div>

                  <span className="text-lg font-bold text-gray-900">
                    26%
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Partners
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Partner network
                    </p>
                  </div>

                  <span className="text-lg font-bold text-gray-900">
                    18%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Other
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Other sources
                    </p>
                  </div>

                  <span className="text-lg font-bold text-gray-900">
                    14%
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

