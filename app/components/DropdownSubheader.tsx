import { ListSubheader, ListSubheaderProps } from '@mui/material';

function DropdownSubheader(props: ListSubheaderProps) {
  return <ListSubheader {...props} />;
}

DropdownSubheader.muiSkipListHighlight = true;
export default DropdownSubheader;
