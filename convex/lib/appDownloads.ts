export type PlatformKey = "win-x64" | "win-arm64";

export type PlatformDownload = {
  url: string;
  sha256: string;
};

export type AppDownloadSource = {
  download_url: string;
  download_sha256?: string;
  download_url_win_x64?: string;
  sha256_win_x64?: string;
  download_url_win_arm64?: string;
  sha256_win_arm64?: string;
  downloads?: Partial<Record<PlatformKey, Partial<PlatformDownload>>>;
};

export type NormalizedDownloads = {
  downloads: Record<PlatformKey, PlatformDownload>;
  download_url: string;
  download_sha256: string;
  download_url_win_x64: string;
  sha256_win_x64: string;
  download_url_win_arm64: string;
  sha256_win_arm64: string;
};

const cleanString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const normalizePlatformDownload = (
  incoming: Partial<PlatformDownload> | undefined,
  fallbackUrl: string,
  fallbackSha256: string
): PlatformDownload => {
  const url = cleanString(incoming?.url) || cleanString(fallbackUrl);
  const sha256 = cleanString(incoming?.sha256) || cleanString(fallbackSha256);

  return { url, sha256 };
};

export const normalizeAppDownloads = (
  source: AppDownloadSource
): NormalizedDownloads => {
  const legacyDefaultUrl = cleanString(source.download_url);
  const legacyDefaultSha = cleanString(source.download_sha256);

  const winX64 = normalizePlatformDownload(
    source.downloads?.["win-x64"],
    cleanString(source.download_url_win_x64) || legacyDefaultUrl,
    cleanString(source.sha256_win_x64) || legacyDefaultSha
  );

  const winArm64 = normalizePlatformDownload(
    source.downloads?.["win-arm64"],
    cleanString(source.download_url_win_arm64),
    cleanString(source.sha256_win_arm64)
  );

  return {
    downloads: {
      "win-x64": winX64,
      "win-arm64": winArm64,
    },
    download_url: winX64.url || legacyDefaultUrl,
    download_sha256: winX64.sha256 || legacyDefaultSha,
    download_url_win_x64: winX64.url,
    sha256_win_x64: winX64.sha256,
    download_url_win_arm64: winArm64.url,
    sha256_win_arm64: winArm64.sha256,
  };
};
