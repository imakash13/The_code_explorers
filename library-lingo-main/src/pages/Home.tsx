import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Users, Clock, BookOpen, Search, CircleUser, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const stats = [
    { title: "Total Books", value: "12,485", icon: Book, color: "text-blue-600" },
    { title: "Active Members", value: "1,274", icon: Users, color: "text-green-600" },
    { title: "Books Borrowed", value: "847", icon: BookOpen, color: "text-orange-600" },
    { title: "Due Returns", value: "156", icon: Clock, color: "text-red-600" }
  ];

  const quickActions = [
    { title: "Search Books", description: "Find books by title, author, or ISBN", icon: Search },
    { title: "Member Portal", description: "Access your account and borrowed books", icon: CircleUser },
    { title: "Issue Book", description: "Check out books to members", icon: BookOpen },
    { title: "Return Book", description: "Process book returns", icon: Book }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header with Login Buttons */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Library Management System</h1>
          <p className="text-gray-500">Welcome to the central dashboard</p>
        </div>
        <div className="flex gap-4">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/login")} // Navigate to Login page
          >
            <User className="h-5 w-5" />
            User Login
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            onClick={() => navigate("/admin")}
          >
            <Shield className="h-5 w-5" />
            Admin Login
          </button>
        </div>
      </div>

      {/* Login Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:border-blue-200 transition-colors cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">User Access</h3>
              <p className="text-gray-500">Browse books, manage your loans, and view your reading history</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-gray-400 transition-colors cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="bg-gray-100 p-3 rounded-full">
              <Shield className="h-6 w-6 text-gray-800" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Admin Portal</h3>
              <p className="text-gray-500">Manage inventory, users, and monitor library operations</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <action.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Book className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Book {index + 1} was borrowed</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Member #{1000 + index}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;