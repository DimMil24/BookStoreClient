const columns = [
    { field: 'edit', label: '', numeric: true,disablePadding: false, },
    { field: 'isbn13', label: 'ID', numeric: true,disablePadding: false, },
    { field: 'title', label: 'Title', numeric: false, disablePadding: true,},
    { field: 'subtitle', label: 'Subtitle', numeric: false, disablePadding: true,},
    { field: 'authors', label: 'Author',numeric: false, disablePadding: true, },
    {
        field: 'published_year',
        label: 'Year',
        numeric: true,
        disablePadding: false
    },
    {
        field: 'average_rating',
        label: 'Rating',
        numeric: true,
        disablePadding: false,
    },
    {
        field: 'num_pages',
        label: 'Pages',
        numeric: true,
        disablePadding: false
    },
    {
        field: 'ratings_count',
        label: 'Ratings',
        numeric: true,
        disablePadding: false
    },
    {
        field: 'price',
        label: 'Price',
        numeric: true,
        disablePadding: false
      },
];

export default columns;
