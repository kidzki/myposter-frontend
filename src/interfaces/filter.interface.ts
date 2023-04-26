export default interface Filter {
  filterByText: string
  filterByCurrentYear: boolean
  sortBy: '' | 'author' | 'asce_date' | 'dsce_date' | string
}
