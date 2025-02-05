'use client'

import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getWebCommerceByCIF } from "@/lib/webCommerce"
import CommerceCard from "@/components/ui/webcommerce-detail"
import { useParams } from "next/navigation"

const WebCommerces = () => {
  const { commerceCIF } = useParams()
  const [webCommerce, setWebCommerce] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWebCommerceByCIF(commerceCIF)
        setWebCommerce(data)
      } catch (error) {
        toast.error("Failed to fetch web commerces")
      }
    }
    fetchData()
  }, [commerceCIF])
  return (
    <div className="container mx-auto py-8">
      {Object.keys(webCommerce).length === 0 ? <p>Loading...</p> : <CommerceCard commerce={webCommerce} />}
      <ToastContainer />
    </div>
  )
}

export default WebCommerces
