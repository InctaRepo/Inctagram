// import React, { useRef, useState } from 'react'
//
// import AvatarEditor from 'react-avatar-editor'
//
// import { SettingPhotoModal } from '@/src/components/profile/profile-setting/setting-photo-modal/setting-photo-modal'
// import { useUploadAvatarMutation } from '@/src/services/profile/profile-api'
//
// const Index = () => {
//   const editorRef = useRef<AvatarEditor>(null)
//   const [uploadAvatar] = useUploadAvatarMutation()
//   const [avatar, setAvatar] = useState<string | null>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<File | null>(null)
//   const handleSaveAvatar = () => {
//     if (editorRef.current) {
//       const canvas = editorRef.current.getImageScaledToCanvas()
//
//       canvas.toBlob(blob => {
//         if (blob) {
//           const file = new File([blob], 'avatar', { type: blob.type })
//
//           convertFileToBase64(file, (file64: string) => {
//             setAvatar(file64)
//           })
//           const formData = new FormData()
//
//           formData.append('file', file)
//           /* setIsModalOpen(false)
//           setSelectedImage(null)*/
//           uploadAvatar(formData)
//             .unwrap()
//             .then(() => {
//               setIsModalOpen(false)
//               setSelectedImage(null)
//             })
//         }
//       })
//     }
//   }
//   const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
//     const reader = new FileReader()
//
//     reader.onloadend = () => {
//       const file64 = reader.result as string
//
//       callBack(file64)
//     }
//     reader.readAsDataURL(file)
//   }
//
//   console.log(isModalOpen)
//
//   return (
//     <div>
//       <SettingPhotoModal
//         avatar={avatar}
//         setAvatar={setAvatar}
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//         selectedImage={selectedImage}
//         setSelectedImage={setSelectedImage}
//         editorRef={editorRef}
//         handleSaveAvatar={handleSaveAvatar}
//       />
//     </div>
//   )
// }
//
// export default Index
