import React from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { Button } from "@/app/components/ui/button";
import { FileText, Plus, Search, Image, File, Video, Music } from "lucide-react";
import styles from "./page.module.css";

const files = [
  {
    id: 1,
    name: "Product Image 1",
    type: "image",
    size: "2.4 MB",
    lastModified: "2024-01-15",
    icon: Image,
  },
  {
    id: 2,
    name: "Product Video",
    type: "video",
    size: "15.8 MB",
    lastModified: "2024-01-14",
    icon: Video,
  },
  {
    id: 3,
    name: "Background Music",
    type: "audio",
    size: "3.2 MB",
    lastModified: "2024-01-13",
    icon: Music,
  },
];

const getFileIcon = (type) => {
  switch (type) {
    case "image":
      return Image;
    case "video":
      return Video;
    case "audio":
      return Music;
    default:
      return File;
  }
};

export default function ContentPage() {
  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Content Management</h2>
          <Button className="flex items-center gap-2">
            <Plus className={styles.fileIcon} />
            Upload File
          </Button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>Total Files</div>
              <FileText className={`${styles.fileIcon} ${styles.blueIcon}`} />
            </div>
            <div className={styles.statsValue}>156</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>Images</div>
              <Image className={`${styles.fileIcon} ${styles.greenIcon}`} />
            </div>
            <div className={styles.statsValue}>84</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>Videos</div>
              <Video className={`${styles.fileIcon} ${styles.purpleIcon}`} />
            </div>
            <div className={styles.statsValue}>32</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>Audio</div>
              <Music className={`${styles.fileIcon} ${styles.yellowIcon}`} />
            </div>
            <div className={styles.statsValue}>40</div>
          </div>
        </div>

        <div className={styles.contentTable}>
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search files..."
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>File</th>
                  <th className={styles.tableHeaderCell}>Type</th>
                  <th className={styles.tableHeaderCell}>Size</th>
                  <th className={styles.tableHeaderCell}>Last Modified</th>
                  <th className={styles.tableHeaderCell} style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {files.map((file) => {
                  const FileIcon = getFileIcon(file.type);
                  return (
                    <tr key={file.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <div className={styles.fileInfo}>
                          <FileIcon className={styles.fileInfoIcon} />
                          <span className={styles.fileName}>{file.name}</span>
                        </div>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.fileType}>{file.type}</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.fileSize}>{file.size}</span>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.fileDate}>{file.lastModified}</span>
                      </td>
                      <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                        <button className={styles.actionButton}>Download</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}