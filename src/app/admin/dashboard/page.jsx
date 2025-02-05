"use client";

import { deleteCommerce, getCommerces, viewToken } from "@/lib/commerces";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Pencil, Image, Trash2, Key } from "lucide-react";
import CreateMerchantDialog from "@/components/ui/create-merchant";
import { set } from "react-hook-form";
import ModifyMerchantDailog from "@/components/ui/modify-commerce";

const AdminDashboard = () => {
  const [commerces, setCommerces] = useState([]);
  const [openCreateCommerce, setCreateCommerceModalOpen] = useState(false);
  const [openModifyCommerce, setModifyCommerceModalOpen] = useState(false);
  const [selectedCommerce, setSelectedCommerce] = useState(null);

  const handleGetCommerces = async () => {
    try {
      const fetchedCommerces = await getCommerces(Cookies.get("token"));
      setCommerces(fetchedCommerces);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSort = (key) => {
    const sortedCommerces = [...commerces].sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
    setCommerces(sortedCommerces);
  };

  useEffect(() => {
    handleGetCommerces();
  }, []);

  const handleCreateCommerce = () => {
    setCreateCommerceModalOpen(true);
  };

  const handleModifyCommerce = (commerce) => {
    setSelectedCommerce(commerce);
    setModifyCommerceModalOpen(true);
  };

  const handleDeleteCommerce = async (commerceCIF) => {
    if (deleteCommerce(Cookies.get("token"), commerceCIF)) {
      toast.success(`Commerce ${commerceCIF} deleted`);
    } else {
      toast.error(`Failed to delete commerce ${commerceCIF}`);
    }

    await handleGetCommerces();

    toast.info(`Eliminar comercio ${id} - Funcionalidad no implementada`);
  };

  const handleViewToken = async (commerceCIF) => {
    const commerceToken = await viewToken(Cookies.get("token"), commerceCIF);

    navigator.clipboard
      .writeText(commerceToken)
      .then(() => {
        toast.success("Token copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy token to clipboard");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Merchants</h1>
        <Button onClick={handleCreateCommerce} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> New Merchant
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="bg-gray-50 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")}>Name</TableHead>
              <TableHead onClick={() => handleSort("cif")}>CIF</TableHead>
              <TableHead onClick={() => handleSort("email")}>Email</TableHead>
              <TableHead onClick={() => handleSort("address")}>
                Address
              </TableHead>
              <TableHead onClick={() => handleSort("pageId")}>pageID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commerces.map((commerce) => (
              <TableRow key={commerce.id}>
                <TableCell>{commerce.name}</TableCell>
                <TableCell>{commerce.cif}</TableCell>
                <TableCell>{commerce.email}</TableCell>
                <TableCell>{commerce.address}</TableCell>
                <TableCell>{commerce.pageId}</TableCell>
                <TableCell>
                  <div className="flex-auto space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleModifyCommerce(commerce)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewToken(commerce.cif)}
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600"
                      onClick={() => handleDeleteCommerce(commerce.cif)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CreateMerchantDialog
      open={openCreateCommerce}
      onOpenChange={setCreateCommerceModalOpen}
      onMerchantCreated={handleGetCommerces}
    />
    {selectedCommerce && (
      <ModifyMerchantDailog
        open={openModifyCommerce}
        onOpenChange={setModifyCommerceModalOpen}
        onMerchantModified={handleGetCommerces}
        commerceDetails={selectedCommerce}
      />
    )}
    </div>
  );
};

export default AdminDashboard;