import { useQuery } from "@tanstack/react-query";
import { fetchVideo } from "../api/fetchVideo";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cards from "../pages/Cards";
import Sidebar from "../components/Sidebar";
import DashboardApp from "../pages/DashboardApp";

function HomeVideos() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['videos'],
        queryFn: fetchVideo,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);

    return (

        <div className="w-full h-full p-8 bg-[rgba(6,7,15,0.938)] backdrop-blur-lg">
            
           
            <div className="grid grid-cols-4 gap-8 mt-8">
                {data && data.map(video => (
                    <div key={video._id} className="col-span-1">
                        <Link to={`/videos/${video._id}`}>
                            <Cards
                                title={video.title}
                                creador={`Creado por: ${video.user?.name}`}
                                matricula={video.matricula}
                                gradient="bg-gradient-to-r from-gray-600 to-blue-700"
                            />

                        </Link>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default HomeVideos;



// <main className="min-h-screen flex items-center justify-center bg-gray-100">
//     <div className="w-full max-w-7xl mx-auto p-10 bg-white rounded-lg shadow-lg">
//         <Link to="/all">
//             <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
//                 <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//                     Atras
//                 </span>
//             </button>
//         </Link>
//         <Link to="/CreateVideos">
//             <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
//                 <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//                     Create Video
//                 </span>
//             </button>
//         </Link>

//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {data && data.map(video => (
//                 <Link key={video._id} to={`/videos/${video._id}`} className="group">
//                     <div className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-between bg-[#e0f4f5] group-hover:bg-[#ccebe6]">
//                         <div>
//                             <p className="text-xl font-semibold text-gray-800">{video.title}</p>
//                             <p className="text-sm text-gray-600">{video.user.name}</p>
//                         </div>
//                     </div>
//                 </Link>

//             ))}
//         </section>
//     </div>
// </main>