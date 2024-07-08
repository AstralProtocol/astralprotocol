# Media Types

Users have the capability to attach a diverse range of media types to a location proof. This functionality is powered by the use of MIME
types, allowing for the inclusion of various data formats such as photos, videos, audio, URLs, LIDAR scans, point clouds, and more. This
section provides an overview of the media types we aim to build support for, their MIME types, and considerations for their use.

:::warning

This is the alpha version and is subject to change!

:::

## Media structure

Currently, the location proofs we're registering on EAS have two fields related to media:

- **`mediaType`**: an array of strings, each a unique designator of the media attached, to ease parsing when location proofs are read
- **`mediaData`**: an array of strings containing some kind of media identifier, likely a
  [CID](https://docs.ipfs.tech/concepts/content-addressing/)

Of course, elements in each array correspond according to index.

In this way, any set of media data can be attached to a location proof. This opens use cases such as geotagged photos and videos, dMRV data
for impact / regeneration projects, etc.

:::note

Data included in the media fields should NOT be required for the location proof strategy. For example, if a strategy used photos of the
surrounding area (i.e. of known landmarks), this data should be included in the proof recipe.

:::

At this point, we have not fully scoped the requirements of the `mediaType` string designators. Any content can be attached to a location
proof — but note there is no standardized way of knowing what type of file / data is attached. Stay tuned here.

## Future Media Types

### 1. Photos

Photos can be attached in various formats, each with its corresponding MIME type:

- **JPEG**: `image/jpeg`
- **PNG**: `image/png`
- **GIF**: `image/gif`
- **TIFF**: `image/tiff`
- **BMP**: `image/bmp`

### 2. Videos

Video attachments support multiple formats to ensure compatibility and optimal performance:

- **MP4**: `video/mp4`
- **WebM**: `video/webm`
- **AVI**: `video/x-msvideo`
- **MOV**: `video/quicktime`
- **MKV**: `video/x-matroska`

### 3. Audio

Audio files in the following formats can be attached to a location proof:

- **MP3**: `audio/mpeg`
- **WAV**: `audio/wav`
- **OGG**: `audio/ogg`
- **AAC**: `audio/aac`

### 4. URLs

URLs can be linked directly from a location proof, providing access to external resources:

- **URL**: `text/uri-list`

### 5. LIDAR Scans

LIDAR scans provide detailed three-dimensional data and are supported in these formats:

- **LAS**: `application/vnd.las`
- **LAZ**: `application/vnd.laszip`

### 6. Point Clouds

Point clouds, representing spatial data points, can be attached in various formats:

- **PCD**: `application/pcd`
- **PLY**: `application/ply`
- **XYZ**: `application/xyz`

### 7. Documents

Users can attach documents to provide additional information or context:

- **PDF**: `application/pdf`
- **Microsoft Word**: `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- **Microsoft Excel**: `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- **Plain Text**: `text/plain`

### 8. Other Formats

We also support a wide range of other media types to ensure flexibility:

- **JSON**: `application/json`
- **XML**: `application/xml`
- **CSV**: `text/csv`
- **ZIP**: `application/zip`

## Considerations for Use

1. **File Size**: Different media types can have varying file sizes. It's essential to consider the storage implications and performance
   impact of large files, especially high-resolution videos, LIDAR scans, and point clouds.
2. **Format Compatibility**: Ensure that the attached media format is compatible with the systems and applications that will access the
   location proof. For example, not all browsers or devices may support every video or audio format.

3. **Security**: Validate and sanitize media files to protect against potential security threats such as malware or malicious code embedded
   in files.

4. **Metadata**: Including metadata with media files (e.g., EXIF data for photos, geolocation for videos) can provide additional context and
   improve the usability of the attached media.

5. **Compression**: Utilize compression for large files to optimize storage and transmission. Formats like LAZ (compressed LAS) are
   preferable for LIDAR scans.

By leveraging MIME types, our system provides a flexible and robust framework for attaching a wide range of media types to location proofs,
enhancing the richness and utility of the data associated with each proof.
