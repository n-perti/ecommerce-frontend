"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavItems = ({ hasWebCommerce }) => {
  const router = useRouter();

  const handleCreateWebCommerce = () => {
    router.push('/commerces/create');
  };

  const handleModifyWebCommerce = () => {
    router.push('/commerces/modify');
  };

  const handleUploadImages = () => {
    router.push('/commerces/upload-images');
  };

  const handleDeleteCommerce = () => {
  };

  const handleGetUserInterested = () => {
    router.push('/commerces/users-interested');
  };

return (
    <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Acciones</h2>
        <div className="flex flex-col space-y-2">
            {!hasWebCommerce ? (
                <Button onClick={handleCreateWebCommerce} className="w-full">
                    Crear WebCommerce
                </Button>
            ) : (
                <>
                    <Button onClick={handleModifyWebCommerce} className="w-full">
                        Modificar WebCommerce
                    </Button>
                    <Button onClick={handleUploadImages} className="w-full">
                        Subir Imágenes
                    </Button>
                    <Button onClick={handleDeleteCommerce} className="w-full">
                        Eliminar Comercio
                    </Button>
                    <Button onClick={handleGetUserInterested} className="w-full">
                        Usuarios Interesados
                    </Button>
                </>
            )}
        </div>
    </div>
);
};

export default NavItems;