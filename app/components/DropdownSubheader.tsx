import { ListSubheader, ListSubheaderProps } from '@mui/material';

ListSubheader;

function DropdownSubheader(props: ListSubheaderProps) {
  return <ListSubheader {...props} />;
}

DropdownSubheader.muiSkipListHighlight = true;
export default DropdownSubheader;
