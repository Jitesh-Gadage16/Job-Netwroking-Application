
"use client";
import React from 'react';
// import Image from "next/image";
// import { Search, MessageSquare } from 'lucide-react';
// import AllPosts from "@/components/AllPosts";
// import { useAuth } from "@/context/AuthContext";
import { Users, Search, Award, Trophy, Play, Target, Zap } from 'lucide-react';


export default function Home() {

  // const [selectedRole, setSelectedRole] = useState(null);
  return (
    <>


      <section className="py-24 relative overflow-hidden">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-10 text-4xl animate-pulse">⚡</div>
          <div className="absolute top-40 right-20 text-3xl animate-bounce">🏆</div>
          <div className="absolute bottom-20 left-20 text-4xl animate-pulse">💎</div>
          <div className="absolute bottom-40 right-10 text-3xl animate-bounce">🚀</div>
        </div>

        <div className="max-w-full mx-auto sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              🎯 Gamified Networking Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Level Up Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Networking Game</span>
          </h1>

          <p className="text-xl text-gray-600 mb-4 font-medium max-w-4xl mx-auto">
            Find meaningful connections or showcase your networking skills. Either way, quality connections get rewarded.
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
            The platform that turns networking into an engaging experience where connectors earn XP, unlock achievements, and build their reputation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg">
              🚀 Start Your Journey
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 flex items-center justify-center transition-all">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </button>
          </div>

          {/* Clean stats */}
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1,200+</div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
              <div className="text-gray-600 font-medium">Connections Made</div>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
              <div className="text-gray-600 font-medium">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Connection Currency?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The first platform to gamify meaningful networking with points, levels, and recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Search className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Find Quality Connections</h3>
              <p className="text-gray-600 leading-relaxed">
                Post connection requests and get help from skilled connectors who are motivated to provide value.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Earn Recognition</h3>
              <p className="text-gray-600 leading-relaxed">
                Build your reputation as a connector by making valuable introductions and earning XP for quality connections.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Trophy className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Level Up & Unlock Achievements</h3>
              <p className="text-gray-600 leading-relaxed">
                Progress through connector levels, earn specialized badges, and showcase your networking expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Role Selection */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Quality connections, meaningful relationships. Choose your path and start building.
            </p>
            <h3 className="text-xl font-semibold text-gray-900">Choose Your Role</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seeker Role */}
            <div
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 cursor-pointer border-2  border-indigo-400 scale-105 shadow-2xl border-gray-200 hover:border-indigo-300 hover:scale-102">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-8 text-white">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="bg-white bg-opacity-20 p-6 rounded-full">
                      <div className="text-6xl">🔍</div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-indigo-300 rounded-full p-2">
                      <Target className="h-5 w-5 text-indigo-800" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Seeker</h3>
                  <p className="text-indigo-100 text-lg font-medium">The Explorer</p>
                </div>
                <p className="text-indigo-100 text-center text-lg mt-4">
                  Find meaningful connections to advance your career and goals
                </p>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Target className="h-5 w-5 text-indigo-600 mr-2" />
                    Your Mission
                  </h4>
                  <p className="text-gray-600">
                    Post connection requests when you need introductions to specific people or opportunities.
                  </p>
                </div>


                <div className="space-y-6 border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">1</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Post Your Request</h5>
                        <p className="text-gray-600 text-sm">Share your specific goals and connection needs</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">2</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Get Connected</h5>
                        <p className="text-gray-600 text-sm">Skilled connectors provide relevant connections</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">3</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Rate & Review</h5>
                        <p className="text-gray-600 text-sm">Rate connections and help connectors build reputation</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-105">
                    Start Seeking
                  </button>
                </div>

              </div>
            </div>

            {/* Connector Role */}
            <div
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 cursor-pointer border-2 border-green-400 scale-105 shadow-2xl'
                border-gray-200 hover:border-green-300 hover:scale-102
              ">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="bg-white bg-opacity-20 p-6 rounded-full">
                      <div className="text-6xl">🤝</div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-300 rounded-full p-2">
                      <Award className="h-5 w-5 text-green-800" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Connector</h3>
                  <p className="text-green-100 text-lg font-medium">The Networker</p>
                </div>
                <p className="text-green-100 text-center text-lg mt-4">
                  Help others succeed by making valuable introductions
                </p>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Zap className="h-5 w-5 text-green-600 mr-2" />
                    Your Mission
                  </h4>
                  <p className="text-gray-600">
                    Browse connection requests and help facilitate meaningful introductions. Build your reputation.
                  </p>
                </div>

                {/* {selectedRole === 'connector' && ( */}
                <div className="space-y-6 border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">1</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Browse Requests</h5>
                        <p className="text-gray-600 text-sm">Find opportunities where you can add real value</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">2</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Make Introductions</h5>
                        <p className="text-gray-600 text-sm">Facilitate valuable connections and relationships</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">3</div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1">Earn XP & Level Up</h5>
                        <p className="text-gray-600 text-sm">Build reputation, unlock achievements, and showcase skills</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105">
                    Start Connecting
                  </button>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div >
      </section >

      {/* Progression System */}
      < section id="progression" className="py-20 bg-white" >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Level Up Your Networking
            </h2>
            <p className="text-xl text-gray-600">
              Progress through connector ranks and earn achievements that showcase your expertise
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-12 border border-indigo-200">
            {/* Connector Levels */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">🏆 Connector Progression</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {[
                  { name: "Beginner", icon: "🌱", color: "from-gray-400 to-gray-600", xp: "0-100" },
                  { name: "Novice", icon: "🔗", color: "from-blue-400 to-blue-600", xp: "101-250" },
                  { name: "Cultivator", icon: "🌿", color: "from-green-400 to-green-600", xp: "251-500" },
                  { name: "Expert", icon: "⚡", color: "from-purple-400 to-purple-600", xp: "501-750" },
                  { name: "Master", icon: "🎯", color: "from-orange-400 to-red-500", xp: "751-1000" },
                  { name: "Legend", icon: "👑", color: "from-yellow-400 to-yellow-500", xp: "1001+" }
                ].map((level, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`w-18 h-18 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-200 shadow-lg group-hover:shadow-xl`}>
                      <span className="text-2xl">{level.icon}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{level.name}</div>
                    <div className="text-xs text-gray-600">{level.xp} XP</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">🎖️ Unlock Achievements</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "🎯 Mentor Matcher",
                  "🚀 Startup Connector",
                  "💼 Industry Expert",
                  "⭐ Super Connector",
                  "🎓 Career Catalyst",
                  "🤝 Partnership Pro"
                ].map((achievement, index) => (
                  <span
                    key={index}
                    className="bg-white text-gray-700 px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 border-2 border-gray-200 hover:border-indigo-300"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600" >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Level Up Your Networking?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join the platform where you make meaningful connections or get recognized for your skills as a connector.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg">
              🚀 Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all">
              Learn More
            </button>
          </div>

          <p className="text-indigo-200 text-sm">
            Free to join • Start connecting in minutes
          </p>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-gray-900 text-white py-12" >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg mr-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Connection Currency</span>
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">BETA</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Connection Currency. All rights reserved.
            </div>
          </div>
        </div>
      </footer >



      {/* <AllPosts /> */}

    </>



  );
}
