/// <reference types="user-agent-data-types" />

export const userAgent = async (): Promise<string> => {
  if (typeof navigator === 'object') {
    const { userAgentData } = navigator;
    let { userAgent } = navigator;

    // https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11
    if (!userAgentData || userAgentData.platform !== 'Windows') {
      return userAgent;
    }

    const { platformVersion } = await userAgentData.getHighEntropyValues([
      'platformVersion',
    ]);

    if (!platformVersion) return userAgent;

    const isWindows11Later = parseInt(platformVersion.split('.')[0]) >= 13;

    if (isWindows11Later)
      return userAgent.replace('Windows NT 10.0', 'Windows NT 11.0');

    return userAgent;
  }

  return '';
};
