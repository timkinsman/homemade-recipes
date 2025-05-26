import { Button } from "ui/button";
import { Grid } from "ui/grid";

export default function Home() {
  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="1">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Grid>
  );
}
