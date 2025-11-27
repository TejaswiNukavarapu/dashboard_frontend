import React, { useState, useEffect } from "react";
import OverviewComp from "../../components/Overview";
import total from "../../../public/OverView/Total.png";
import revenue from "../../../public/OverView/revenue.png";
import pending from "../../../public/OverView/pending.png";
import Payment from "../../components/Payment";
import AnnouncementsOverView from "../../components/AnnouncementsOverView";
import { useGetProjectedRevenueQuery } from "../../Slice/OverviewSlice";
import useFetchEmployees from '../../utils/useFetchEmployeesUtils';
import MarkAttendence from '../../components/Attendence/MarkAttendence'

export default function Superadmin() {
  const [internCount, setInternCount] = useState(0);
  const [showAttendance, setShowAttendance] = useState(false);

  // Fetch total employees
  const { data: employees } = useFetchEmployees();
  const [totalEmployee, setTotalEmployee] = useState(0);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/totalEmployeeCount`
        );
        const json = await res.json();
        setTotalEmployee(json.totalEmployee);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    fetchEmployeeCount();
  }, []);

  // Fetch projected revenue
  const {
    data: revenueAPIData,
    isLoading,
    error: revenueError,
  } = useGetProjectedRevenueQuery();

  if (isLoading) return <p>Loading revenue data...</p>;
  if (revenueError) return <p>Error loading revenue</p>;

  const {
    totalStudents,
    totalProjectedRevenue,
    totalCreditedRevenue,
    totalPendingRevenue,
    creditedCount,
    pendingCount,
    partialPaymentCount,
  } = revenueAPIData || {};

  const interntarget = internCount * 100000;

  return (
    <>
      <div className="flex px-5">
        <h1 className=" flex-1 text-[26px] ">Statistics</h1>

        <div
          className="p-2 border-[#004AAD] bg-[#004AAD] text-white rounded-md border items-center cursor-pointer"
          onClick={() => setShowAttendance(true)}
        >
          <h1 className="text-center">Mark Attendance</h1>
          {/* <h1 className="text-center">of Employees</h1> */}
        </div>
      </div>

      <div className="w-auto mr-5 py-6">
        <div className="flex gap-2">
          <OverviewComp title="Total Target" revenue={interntarget} img={total} />
          <OverviewComp
            title="Projected Revenue"
            revenue={`Rs ${totalProjectedRevenue}`}
            img={total}
          />
          <OverviewComp
            title="Revenue Credited"
            revenue={`Rs ${totalCreditedRevenue}`}
            img={revenue}
          />
          <OverviewComp
            title="Pending Revenue"
            revenue={`Rs ${totalPendingRevenue}`}
            img={pending}
          />
        </div>

        <div className="flex mt-3 gap-3">
          <div className="flex-col">
            <OverviewComp title="Total Payment Counts" revenue={totalStudents} />

            <Payment
              creditedCount={creditedCount}
              pendingCount={pendingCount}
              partialPaymentCount={partialPaymentCount}
            />
          </div>

          <div className="w-full">
            <AnnouncementsOverView />
          </div>
        </div>
      </div>


      {showAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAttendance(false)}
            >
              ✖
            </button>

            <MarkAttendence />
          </div>
        </div>
      )}
    </>
  );
}
