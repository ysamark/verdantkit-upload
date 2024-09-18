export type DefaultAdapterConfig = Record<string, unknown>;

export type UploadClientAdapterConfig<
  AdapterConfig extends DefaultAdapterConfig = DefaultAdapterConfig
> = AdapterConfig & {};
