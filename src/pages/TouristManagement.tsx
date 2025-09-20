import { useState } from "react";
import { Search, Plus, Eye, LogOut, QrCode, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminSidebar from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";

const TouristManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newTourist, setNewTourist] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    bandId: ""
  });

  const tourists = [
    {
      id: 1,
      name: "John Smith",
      uvid: "UV-2024-001",
      bandId: "SB-001",
      entryTime: "2024-01-15 09:30",
      status: "Active",
      zone: "Beach Area",
      nationality: "USA",
      phone: "+1-555-0123"
    },
    {
      id: 2,
      name: "Maria Garcia",
      uvid: "UV-2024-002",
      bandId: "SB-002",
      entryTime: "2024-01-15 10:15",
      status: "Exited",
      zone: "Museum District",
      nationality: "Spain",
      phone: "+34-600-123456"
    },
    {
      id: 3,
      name: "David Chen",
      uvid: "UV-2024-003",
      bandId: "SB-003",
      entryTime: "2024-01-15 11:00",
      status: "Active",
      zone: "Shopping District",
      nationality: "China",
      phone: "+86-138-0013-8000"
    },
    {
      id: 4,
      name: "Alice Johnson",
      uvid: "UV-2024-004",
      bandId: "SB-004",
      entryTime: "2024-01-15 14:20",
      status: "Active",
      zone: "Harbor View",
      nationality: "Canada",
      phone: "+1-416-555-0199"
    }
  ];

  const generateUVID = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `UV-${year}-${randomNum}`;
  };

  const handleRegisterTourist = () => {
    if (!newTourist.name || !newTourist.email || !newTourist.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const uvid = generateUVID();
    const bandId = `SB-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    toast({
      title: "Tourist Registered Successfully",
      description: `UVID: ${uvid} | Band ID: ${bandId}`,
      variant: "default"
    });

    setNewTourist({
      name: "",
      email: "",
      phone: "",
      nationality: "",
      bandId: ""
    });
  };

  const handleExitTourist = (touristName: string) => {
    toast({
      title: "Tourist Exit Recorded",
      description: `${touristName} has been marked as exited.`,
      variant: "default"
    });
  };

  const filteredTourists = tourists.filter(tourist =>
    tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.uvid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.bandId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Tourist Management</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Register Tourist
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Register New Tourist</DialogTitle>
                  <DialogDescription>
                    Fill in the details to register a new tourist and generate a unique visit ID.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newTourist.name}
                      onChange={(e) => setNewTourist({...newTourist, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTourist.email}
                      onChange={(e) => setNewTourist({...newTourist, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newTourist.phone}
                      onChange={(e) => setNewTourist({...newTourist, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select onValueChange={(value) => setNewTourist({...newTourist, nationality: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="spain">Spain</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                <Button onClick={handleRegisterTourist} className="w-full" variant="hero">
                  Register & Generate UVID
                </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter Tourists</CardTitle>
              <CardDescription>
                Find tourists by name, UVID, or band ID
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, UVID, or Band ID..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR Exit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tourists Table */}
          <Card>
            <CardHeader>
              <CardTitle>Registered Tourists</CardTitle>
              <CardDescription>
                Complete list of tourists with their current status and details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tourist Name</TableHead>
                    <TableHead>UVID</TableHead>
                    <TableHead>Band ID</TableHead>
                    <TableHead>Entry Time</TableHead>
                    <TableHead>Current Zone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTourists.map((tourist) => (
                    <TableRow key={tourist.id}>
                      <TableCell className="font-medium">{tourist.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tourist.uvid}</Badge>
                      </TableCell>
                      <TableCell>{tourist.bandId}</TableCell>
                      <TableCell>{tourist.entryTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{tourist.zone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={tourist.status === "Active" ? "default" : "secondary"}
                          className={tourist.status === "Active" ? "bg-success/20 text-success border-success/30" : ""}
                        >
                          {tourist.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Tourist Details</DialogTitle>
                                <DialogDescription>
                                  Detailed information for {tourist.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Name</Label>
                                    <p className="text-sm text-muted-foreground">{tourist.name}</p>
                                  </div>
                                  <div>
                                    <Label>UVID</Label>
                                    <p className="text-sm text-muted-foreground">{tourist.uvid}</p>
                                  </div>
                                  <div>
                                    <Label>Band ID</Label>
                                    <p className="text-sm text-muted-foreground">{tourist.bandId}</p>
                                  </div>
                                  <div>
                                    <Label>Nationality</Label>
                                    <p className="text-sm text-muted-foreground">{tourist.nationality}</p>
                                  </div>
                                  <div>
                                    <Label>Phone</Label>
                                    <p className="text-sm text-muted-foreground">{tourist.phone}</p>
                                  </div>
                                  <div>
                                    <Label>Current Status</Label>
                                    <Badge 
                                      variant={tourist.status === "Active" ? "default" : "secondary"}
                                      className={tourist.status === "Active" ? "bg-success/20 text-success border-success/30" : ""}
                                    >
                                      {tourist.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {tourist.status === "Active" && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleExitTourist(tourist.name)}
                              className="text-danger hover:text-danger"
                            >
                              <LogOut className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TouristManagement;