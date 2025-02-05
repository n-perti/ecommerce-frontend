'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { deleteWebCommerce, getWebCommerceByCIF } from "@/lib/webCommerce"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit3, Trash2, UploadCloud, Archive, User } from 'lucide-react'
import CreateWebCommerceDialog from "@/components/ui/create-webcommerce"
import ModifyWebCommerceDialog from "@/components/ui/modify-webcommerce"
import UploadWebCommerceDialog from "@/components/ui/upload-webcommerce"
import UserInterestedDialog from '@/components/ui/user-interested-dialog';

const CommerceDashboard = () => {
  const [commerce, setCommerce] = useState(null)
  const [openCreate, setOpenCreate] = useState(false)
  const [openModify, setOpenModify] = useState(false)
  const [openUpload, setOpenUpload] = useState(false)
  const [isUserInterestedDialogOpen, setIsUserInterestedDialogOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("commerceToken")
      if (!token) {
        router.push("/commerces/login")
      }
    }

    const fetchData = async () => {
      try {
        const data = await getWebCommerceByCIF(Cookies.get('commerceCIF'))
        setCommerce(data)
      } catch (error) {
        toast.error("Failed to fetch commerce data")
      }
    }

    fetchToken()
    fetchData()
  }, [router])

  const handleCreateWebCommerce = () => setOpenCreate(true)
  const handleModifyWebCommerce = () => setOpenModify(true)
  const handleUpload = () => setOpenUpload(true)

  const handleDeleteWebCommerce = async () => {
    await deleteWebCommerce(Cookies.get('commerceToken'), Cookies.get('commerceCIF'), 'delete')
    toast.success("Web commerce deleted")
    setCommerce(null)
  }

  const handleArchiveWebCommerce = async () => {
    await deleteWebCommerce(Cookies.get('commerceToken'), Cookies.get('commerceCIF'), 'archive')
    toast.success("Web commerce archived")
    setCommerce(null)
  }

  const handleGetUserInterested = () => {
    setIsUserInterestedDialogOpen(true);
  };

  const ActionButton = ({ onClick, icon: Icon, children }) => (
    <Button 
      onClick={onClick}
      className="w-full mb-2 justify-start text-left"
    >
      <Icon className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-1/4 p-4 bg-white shadow-md">
        <div className="sticky top-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Commerce Dashboard</h2>
          {commerce ? (
            <div className="space-y-2">
              <ActionButton onClick={handleModifyWebCommerce} icon={Edit3}>
                Modify Web Commerce
              </ActionButton>
              <ActionButton onClick={handleDeleteWebCommerce} icon={Trash2}>
                Delete Web Commerce
              </ActionButton>
              <ActionButton onClick={handleUpload} icon={UploadCloud}>
                Upload Web Commerce
              </ActionButton>
              <ActionButton onClick={handleArchiveWebCommerce} icon={Archive}>
                Archive Web Commerce
              </ActionButton>
              <ActionButton onClick={handleGetUserInterested} icon={User}>
                Get User Interested
              </ActionButton>
            </div>
          ) : (
            <ActionButton onClick={handleCreateWebCommerce} icon={PlusCircle}>
              Create a web commerce
            </ActionButton>
          )}
        </div>
      </aside>
      
      <main className="w-full md:w-3/4 p-6">
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          {commerce ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Your Web Commerce</h3>
              <div>
                <p><strong>Name:</strong> {commerce.title}</p>
                <p><strong>CIF:</strong> {commerce.commerceCIF}</p>
                <p><strong>City:</strong> {commerce.city}</p>
                <p><strong>Activity:</strong> {commerce.activity}</p>
              </div>
              <Button onClick={handleGetUserInterested} size="lg" className="mt-4">
                Get User Interested
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">You don't have a web commerce yet</p>
              <Button onClick={handleCreateWebCommerce} size="lg">
                <PlusCircle className="w-5 h-5 mr-2" />
                Create a web commerce
              </Button>
            </div>
          )}
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Review Statistics</h3>
          {commerce ? (
            <div>
              <p><strong>Average Rating:</strong> {commerce.averageRating} / 5</p>
              <p><strong>Total Reviews:</strong> {commerce.totalReviews}</p>
            </div>
          ) : (
            <p className="text-gray-600">No reviews available.</p>
          )}
        </section>
      </main>

      <UserInterestedDialog
        isOpen={isUserInterestedDialogOpen}
        onClose={() => setIsUserInterestedDialogOpen(false)}
        token={Cookies.get("commerceToken")}
        commerceCIF={commerce?.commerceCIF}
      />

      <CreateWebCommerceDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onWebCommerceCreated={() => {}}
      />
      <ModifyWebCommerceDialog
        open={openModify}
        onOpenChange={setOpenModify}
        onWebCommerceUpdated={() => {}}
      />
      <UploadWebCommerceDialog
        open={openUpload}
        onOpenChange={setOpenUpload}
        onPhotosUploaded={() => {}}
      />
      <ToastContainer />
    </div>
  )
}

export default CommerceDashboard

