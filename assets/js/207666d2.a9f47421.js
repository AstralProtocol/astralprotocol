"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2148],{7025:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>d,toc:()=>l});var s=n(4848),o=n(8453);const t={},r="Media Types",d={id:"location-proof-protocol/media-types",title:"Media Types",description:"Users have the capability to attach a diverse range of media types to a location proof. This functionality is powered by the use of MIME",source:"@site/docs/location-proof-protocol/media-types.md",sourceDirName:"location-proof-protocol",slug:"/location-proof-protocol/media-types",permalink:"/docs/location-proof-protocol/media-types",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Strategies + Recipes",permalink:"/docs/location-proof-protocol/strategies-recipes"}},a={},l=[{value:"Media structure",id:"media-structure",level:2},{value:"Future Media Types",id:"future-media-types",level:2},{value:"1. Photos",id:"1-photos",level:3},{value:"2. Videos",id:"2-videos",level:3},{value:"3. Audio",id:"3-audio",level:3},{value:"4. URLs",id:"4-urls",level:3},{value:"5. LIDAR Scans",id:"5-lidar-scans",level:3},{value:"6. Point Clouds",id:"6-point-clouds",level:3},{value:"7. Documents",id:"7-documents",level:3},{value:"8. Other Formats",id:"8-other-formats",level:3},{value:"Considerations for Use",id:"considerations-for-use",level:2}];function c(e){const i={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"media-types",children:"Media Types"}),"\n",(0,s.jsx)(i.p,{children:"Users have the capability to attach a diverse range of media types to a location proof. This functionality is powered by the use of MIME\ntypes, allowing for the inclusion of various data formats such as photos, videos, audio, URLs, LIDAR scans, point clouds, and more. This\nsection provides an overview of the media types we aim to build support for, their MIME types, and considerations for their use."}),"\n",(0,s.jsx)(i.admonition,{type:"warning",children:(0,s.jsx)(i.p,{children:"This is the alpha version and is subject to change!"})}),"\n",(0,s.jsx)(i.h2,{id:"media-structure",children:"Media structure"}),"\n",(0,s.jsx)(i.p,{children:"Currently, the location proofs we're registering on EAS have two fields related to media:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:(0,s.jsx)(i.code,{children:"mediaType"})}),": an array of strings, each a unique designator of the media attached, to ease parsing when location proofs are read"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:(0,s.jsx)(i.code,{children:"mediaData"})}),": an array of bytes containing either the media itself or some kind of media identifier, likely a CID"]}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"Of course, elements in each array correspond accoding to index."}),"\n",(0,s.jsx)(i.p,{children:"In this way, any set of media data can be attached to a location proof. This opens use cases such as geotagged photos and videos, dMRV data\nfor impact / regeneration projects, etc."}),"\n",(0,s.jsx)(i.admonition,{type:"note",children:(0,s.jsx)(i.p,{children:"Data included in the media fields should NOT be required for the location proof strategy. For example, if a strategy used photos of the\nsurrounding area (i.e. of known landmarks), this data should be included in the proof recipe."})}),"\n",(0,s.jsxs)(i.p,{children:["At this point, we have not fully scoped the requirements of the ",(0,s.jsx)(i.code,{children:"mediaType"})," string designators. Any content can be attached to a location\nproof (which is why we selected the versatile ",(0,s.jsx)(i.code,{children:"bytes"})," data type) \u2014 but note there is no standardized way of knowing what type of file / data\nis attached. Stay tuned here."]}),"\n",(0,s.jsx)(i.h2,{id:"future-media-types",children:"Future Media Types"}),"\n",(0,s.jsx)(i.h3,{id:"1-photos",children:"1. Photos"}),"\n",(0,s.jsx)(i.p,{children:"Photos can be attached in various formats, each with its corresponding MIME type:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"JPEG"}),": ",(0,s.jsx)(i.code,{children:"image/jpeg"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"PNG"}),": ",(0,s.jsx)(i.code,{children:"image/png"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"GIF"}),": ",(0,s.jsx)(i.code,{children:"image/gif"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"TIFF"}),": ",(0,s.jsx)(i.code,{children:"image/tiff"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"BMP"}),": ",(0,s.jsx)(i.code,{children:"image/bmp"})]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"2-videos",children:"2. Videos"}),"\n",(0,s.jsx)(i.p,{children:"Video attachments support multiple formats to ensure compatibility and optimal performance:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"MP4"}),": ",(0,s.jsx)(i.code,{children:"video/mp4"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"WebM"}),": ",(0,s.jsx)(i.code,{children:"video/webm"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"AVI"}),": ",(0,s.jsx)(i.code,{children:"video/x-msvideo"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"MOV"}),": ",(0,s.jsx)(i.code,{children:"video/quicktime"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"MKV"}),": ",(0,s.jsx)(i.code,{children:"video/x-matroska"})]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"3-audio",children:"3. Audio"}),"\n",(0,s.jsx)(i.p,{children:"Audio files in the following formats can be attached to a location proof:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"MP3"}),": ",(0,s.jsx)(i.code,{children:"audio/mpeg"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"WAV"}),": ",(0,s.jsx)(i.code,{children:"audio/wav"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"OGG"}),": ",(0,s.jsx)(i.code,{children:"audio/ogg"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"AAC"}),": ",(0,s.jsx)(i.code,{children:"audio/aac"})]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"4-urls",children:"4. URLs"}),"\n",(0,s.jsx)(i.p,{children:"URLs can be linked directly from a location proof, providing access to external resources:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"URL"}),": ",(0,s.jsx)(i.code,{children:"text/uri-list"})]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"5-lidar-scans",children:"5. LIDAR Scans"}),"\n",(0,s.jsx)(i.p,{children:"LIDAR scans provide detailed three-dimensional data and are supported in these formats:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"LAS"}),": ",(0,s.jsx)(i.code,{children:"application/vnd.las"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"LAZ"}),": ",(0,s.jsx)(i.code,{children:"application/vnd.laszip"})]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"6-point-clouds",children:"6. Point Clouds"}),"\n",(0,s.jsx)(i.p,{children:"Point clouds, representing spatial data points, can be attached in various formats:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"PCD"}),": ",(0,s.jsx)(i.code,{children:"application/pcd"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"PLY"}),": ",(0,s.jsx)(i.code,{children:"application/ply"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"XYZ"}),": ",(0,s.jsx)(i.code,{children:"application/xyz"})]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"7-documents",children:"7. Documents"}),"\n",(0,s.jsx)(i.p,{children:"Users can attach documents to provide additional information or context:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"PDF"}),": ",(0,s.jsx)(i.code,{children:"application/pdf"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Microsoft Word"}),": ",(0,s.jsx)(i.code,{children:"application/msword"}),", ",(0,s.jsx)(i.code,{children:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Microsoft Excel"}),": ",(0,s.jsx)(i.code,{children:"application/vnd.ms-excel"}),", ",(0,s.jsx)(i.code,{children:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Plain Text"}),": ",(0,s.jsx)(i.code,{children:"text/plain"})]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"8-other-formats",children:"8. Other Formats"}),"\n",(0,s.jsx)(i.p,{children:"We also support a wide range of other media types to ensure flexibility:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"JSON"}),": ",(0,s.jsx)(i.code,{children:"application/json"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"XML"}),": ",(0,s.jsx)(i.code,{children:"application/xml"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"CSV"}),": ",(0,s.jsx)(i.code,{children:"text/csv"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"ZIP"}),": ",(0,s.jsx)(i.code,{children:"application/zip"})]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"considerations-for-use",children:"Considerations for Use"}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"File Size"}),": Different media types can have varying file sizes. It's essential to consider the storage implications and performance\nimpact of large files, especially high-resolution videos, LIDAR scans, and point clouds."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Format Compatibility"}),": Ensure that the attached media format is compatible with the systems and applications that will access the\nlocation proof. For example, not all browsers or devices may support every video or audio format."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Security"}),": Validate and sanitize media files to protect against potential security threats such as malware or malicious code embedded\nin files."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Metadata"}),": Including metadata with media files (e.g., EXIF data for photos, geolocation for videos) can provide additional context and\nimprove the usability of the attached media."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Compression"}),": Utilize compression for large files to optimize storage and transmission. Formats like LAZ (compressed LAS) are\npreferable for LIDAR scans."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"By leveraging MIME types, our system provides a flexible and robust framework for attaching a wide range of media types to location proofs,\nenhancing the richness and utility of the data associated with each proof."})]})}function h(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>d});var s=n(6540);const o={},t=s.createContext(o);function r(e){const i=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(t.Provider,{value:i},e.children)}}}]);