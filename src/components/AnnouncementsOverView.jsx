// import React, { useEffect, useState } from "react";

// export default function AnnouncementsOverView() {
//   const [latestAnnouncement, setLatestAnnouncement] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchImage = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/announcement/announcement`
//       );
//       const result = await response.json();
//       console.log("announcement", result);

//       const latest = result.announcements.reduce((latest, current) => {
//         if (
//           !latest ||
//           new Date(current.createdAt) > new Date(latest.createdAt)
//         ) {
//           return current;
//         }
//         return latest;
//       }, null);

//       setLatestAnnouncement(latest);
//     } catch (error) {
//       console.log("error", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchImage();
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-full border-[#004AAD] border rounded-md bg-[#004AAD1A] items-center cursor-pointer p-4">
//         <p className="text-[#004AAD] font-bold text-2xl">Announcements</p>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className=" border-[#004AAD] border rounded-md bg-[#004AAD1A] items-center cursor-pointer">
//       <div className="p-2 ml-3">
//         <h1 className="text-[#004AAD] font-bold text-2xl">Announcements</h1>

//         {latestAnnouncement ? (
//           latestAnnouncement.image ? (
//             <img
//               src={`${import.meta.env.VITE_BACKEND_URL}${latestAnnouncement.image}`}
//               alt="Announcement"
//               className="w-[23%] object-cover h-[10%] rounded-md mt-2"
//             />
//           ) : (
//             <div>
//               <div className="flex gap-2">
//                 <h1>{latestAnnouncement.title}</h1>
//               </div>
//               <div className="text-[#004AAD]">
//                 <h1 className="font-sans text-2xl">
//                   {latestAnnouncement.description}
//                 </h1>
//               </div>
//             </div>
//           )
//         ) : (
//           <p className="mt-2 text-gray-600">
//             No recent announcement available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
  import React, { useEffect, useState } from "react";

  export default function AnnouncementsOverView() {
    const [latestAnnouncement, setLatestAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/announcement/announcement`
        );
        const result = await response.json();
        console.log("announcement", result);

        const latest = result.announcements.reduce((latest, current) => {
          if (
            !latest ||
            new Date(current.createdAt) > new Date(latest.createdAt)
          ) {
            return current;
          }
          return latest;
        }, null);

        setLatestAnnouncement(latest);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchImage();
    }, []);

    if (loading) {
      return (
        <div className="h-full border-[#004AAD] border rounded-md bg-[#004AAD1A] p-4">
          <p className="text-[#004AAD] font-bold text-2xl">Announcements</p>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="border-[#004AAD] border rounded-md bg-[#004AAD1A] cursor-pointer">
        <div className="p-4">
          <h1 className="text-[#004AAD] font-bold text-2xl mb-3">
            Announcements
          </h1>

          {latestAnnouncement ? (
            <div className="flex gap-4 flex-row items-start">

              {latestAnnouncement.image ? (
                <div className="w-auto h-72 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${latestAnnouncement.image}`}
                    alt="Announcement"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 bg-gray-300 rounded-md flex items-center justify-center">
                  <span className="text-gray-600 text-sm">No Image</span>
                </div>
              )}

              <div className="flex flex-col">
                <h2 className="text-xl font-bold">{latestAnnouncement.title}</h2>
                <p className="text-[#004AAD] text-lg mt-2">
                  {latestAnnouncement.description}
                </p>
              </div>

            </div>
          ) : (
            <p className="mt-2 text-gray-600">No recent announcement available.</p>
          )}
        </div>
      </div>
    );
  }
