"use client";

import { Button } from "ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button fullWidth={{ initial: true, sm: false }}>Hello world</Button>
      </main>
    </div>
  );
}
