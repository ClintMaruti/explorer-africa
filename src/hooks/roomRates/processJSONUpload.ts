import { CollectionBeforeChangeHook } from 'payload'

interface RoomRatesType {
  jsonUpload?: string | Record<string, any>
  seasons?: Record<string, string>
  rates?: Array<Record<string, any>>
  [key: string]: any
}

export const processJSONUpload: CollectionBeforeChangeHook = async ({
  data,
  operation,
}: {
  data: Record<string, any>
  operation: 'create' | 'update' | 'delete'
}) => {
  const typedData = data as RoomRatesType

  // Only process if jsonUpload field has data and we're creating/updating
  if (typedData.jsonUpload && (operation === 'create' || operation === 'update')) {
    try {
      const jsonData =
        typeof typedData.jsonUpload === 'string'
          ? JSON.parse(typedData.jsonUpload)
          : typedData.jsonUpload

      // Extract data from JSON
      return {
        ...typedData,
        seasons: jsonData.seasons || typedData.seasons,
        rates: jsonData.rates || typedData.rates,
        // Remove the jsonUpload field from final data
        jsonUpload: undefined,
      }
    } catch (error) {
      throw new Error('Invalid JSON format')
    }
  }
  return typedData
}
