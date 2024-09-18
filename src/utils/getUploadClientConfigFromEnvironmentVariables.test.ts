import { beforeAll, describe, expect, it } from "vitest";
import { getUploadClientConfigFromEnvironmentVariables } from "./getUploadClientConfigFromEnvironmentVariables";

beforeAll(() => {
  Object.assign(process.env, {
    DATA_REFUGE_CLIENT_ID: "MyRefugeClientId",
    DATA_REFUGE_CLIENT_SECRET: "MyRefugeClientSecret",
    DATA_REFUGE_GOOGLE_DRIVE_CLIENT_ID: "MyGoogleDriveClientId",
    DATA_REFUGE_GOOGLE_DRIVE_CLIENT_SECRET: "MyGoogleDriveClientSecret",
    NEXT_PUBLIC_DATA_REFUGE_AZURE_CLIENT_ID: "MyAzureClientId",
    NEXT_PUBLIC_DATA_REFUGE_AZURE_CLIENT_SECRET: "MyAzureClientSecret",
    REACT_APP_DATA_REFUGE_AWS_CLIENT_ID: "MyAWSClientId",
    REACT_APP_DATA_REFUGE_AWS_CLIENT_SECRET: "MyAWSClientSecret",
    REACT_APP_DATA_REFUGE_AWS_RegionCode: "MyAWSRegionCode",
  });
});

describe("Test getUploadClientConfigFromEnvironmentVariables util", () => {
  it("should get upload client config based on existing environment variables named in the right pattern", () => {
    const config = getUploadClientConfigFromEnvironmentVariables();

    expect(config).toMatchObject({
      clientId: "MyRefugeClientId",
      clientSecret: "MyRefugeClientSecret",
      googleDriveClientId: "MyGoogleDriveClientId",
      googleDriveClientSecret: "MyGoogleDriveClientSecret",
      azureClientId: "MyAzureClientId",
      azureClientSecret: "MyAzureClientSecret",
      awsClientId: "MyAWSClientId",
      awsClientSecret: "MyAWSClientSecret",
      awsRegionCode: "MyAWSRegionCode",
    });
  });
});
