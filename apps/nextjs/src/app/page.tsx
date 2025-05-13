import { Button } from "ui/button";
import { Flex } from "ui/flex";
import { Grid } from "ui/grid";
import { theme } from "ui/theme";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{
            border: `1px solid ${theme.colors.slateA.slateA4}`,
            borderRadius: theme.radii[4],
            maxWidth: "320px",
            width: "100%",
          }}
        >
          <div style={{ padding: theme.space[2] }}>
            <h3>Confirm ??</h3>
          </div>

          <Flex direction="column" gap="2" style={{ padding: theme.space[2] }}>
            <Grid columns={{ initial: "1", sm: "2" }} gap="1">
              <span style={{ color: theme.colors.slate.slate11 }}>
                First name
              </span>
              <span>James</span>
            </Grid>

            <Grid columns={{ initial: "1", sm: "2" }} gap="1">
              <span style={{ color: theme.colors.slate.slate11 }}>
                Last name
              </span>
              <span>Sunderland</span>
            </Grid>
          </Flex>

          <Flex
            direction={{ initial: "column", sm: "row" }}
            gap="1"
            justify="between"
            style={{ padding: theme.space[2] }}
          >
            <Button variant="outline" fullWidth={{ initial: true, sm: false }}>
              Cancel
            </Button>
            <Button variant="error" fullWidth={{ initial: true, sm: false }}>
              Confirm
            </Button>
          </Flex>
        </div>
      </main>
    </div>
  );
}
