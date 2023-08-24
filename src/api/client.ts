import { create } from 'apisauce'


const apiClient = create({
   baseURL: 'https://api.skillsadvices.com/shareskillsapi',
   timeout: 30000,
   headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRhdGFAZXhhbXBsZS5jb20ifQ.ZxHZBjy_2yRTE9tDVizgoiBTehz7D9DxYIDNYNl8NUw`,
      email: 'tata@example.com',
   }
})

//Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlmbGV1cnk5NUBnbWFpbC5jb20ifQ.AtBat_3phqKcHQlm_dZQXXR58Z2dDrLC6TwkOcmHevU`,
//email: 'yfleury95@gmail.com',

//MAradona : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpZWdvQGV4YW1wbGUuY29tIn0.8JPvKcEtq_v681pIcBTp91K54USrZsKFvVxsGMVj5HU

export default apiClient

// 192.168.1.17
