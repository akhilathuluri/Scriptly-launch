import { normalizeAppDownloads } from "./appDownloads";

type AppTableSource = {
  app_id: string;
  app_name: string;
  latest_version: string;
  minimum_version: string;
  release_notes: string;
  download_url: string;
  download_sha256?: string;
  download_url_win_x64?: string;
  sha256_win_x64?: string;
  download_url_win_arm64?: string;
  sha256_win_arm64?: string;
  downloads?: {
    "win-x64"?: {
      url?: string;
      sha256?: string;
    };
    "win-arm64"?: {
      url?: string;
      sha256?: string;
    };
  };
};

type AppTableApiRecord = {
  app_id: string;
  app_name: string;
  latest_version: string;
  minimum_version: string;
  release_notes: string;
  downloads: {
    "win-x64": {
      url: string;
      sha256: string;
    };
    "win-arm64": {
      url: string;
      sha256: string;
    };
  };
  download_url: string;
  download_sha256: string;
  download_url_win_x64: string;
  sha256_win_x64: string;
  download_url_win_arm64: string;
  sha256_win_arm64: string;
};

export const toAppTableApiRecord = (row: AppTableSource): AppTableApiRecord => {
  const normalizedDownloads = normalizeAppDownloads(row);

  return {
    app_id: row.app_id,
    app_name: row.app_name,
    latest_version: row.latest_version,
    minimum_version: row.minimum_version,
    release_notes: row.release_notes,
    downloads: normalizedDownloads.downloads,
    download_url: normalizedDownloads.download_url,
    download_sha256: normalizedDownloads.download_sha256,
    download_url_win_x64: normalizedDownloads.download_url_win_x64,
    sha256_win_x64: normalizedDownloads.sha256_win_x64,
    download_url_win_arm64: normalizedDownloads.download_url_win_arm64,
    sha256_win_arm64: normalizedDownloads.sha256_win_arm64,
  };
};

export const toAppTableApiResponse = (rows: AppTableSource[]) => {
  const data = rows.map(toAppTableApiRecord);

  return {
    count: data.length,
    data,
  };
};
