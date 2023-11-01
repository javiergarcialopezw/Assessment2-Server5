import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "test_history" })
export class TestHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  repository_name: string;

  @Column({ type: "text", nullable: true })
  outputfile_url: string;

  @Column({ type: "datetime" })
  created_at: Date;

  @Column({ type: "datetime" })
  updated_at: Date;
}
