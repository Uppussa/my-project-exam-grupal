import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Cards from "./Cards";

export default function DashboardApp() {



  return (
    <div
      className="w-full h-full p-8 bg-[rgba(6,7,15,0.938)] backdrop-blur-lg">
      <Navbar />
      <div className="grid grid-cols-4 gap-8 mt-8">
        <div className="col-span-1 flex flex-col gap-12"> 
          <Link to="/SolutionExam">
          <Cards
            title="verb - PAST TENSE" 
            subtitle="Nivel de inglés: A1"  
            gradient="bg-gradient-to-r from-gray-600 to-blue-700" 
                />
          </Link>
                </div>
        <div className="col-span-1">
        <Link to="/SolutionExam">
        <Cards
            title="verb - PAST TENSE" 
            subtitle="Nivel de inglés: B2"  
            gradient="bg-gradient-to-r from-gray-600 to-blue-700" 
            
          />
          </Link>
        </div>
        <div className="col-span-1">
        <Link to="/SolutionExam">
        <Cards
            title="verb - PAST TENSE" 
            subtitle="Nivel de inglés: B1" 
            gradient="bg-gradient-to-r from-gray-600 to-blue-700"  
            
          />
          </Link>
        </div>
        <div className="col-span-1">
        <Link to="/SolutionExam">
        <Cards
            title="verb - PAST TENSE" 
            subtitle="Nivel de inglés: A1" 
            gradient="bg-gradient-to-r from-gray-600 to-blue-700" 
            
          />
          </Link>
        </div>
        <div className="col-span-1">
        <Link to="/SolutionExam">
        <Cards
            title="verb - PAST TENSE" 
            subtitle="Nivel de inglés: A2" 
            gradient="bg-gradient-to-r from-gray-600 to-blue-700" 
            
          />
          </Link>
        </div>
      </div>
    </div>
  );
}
