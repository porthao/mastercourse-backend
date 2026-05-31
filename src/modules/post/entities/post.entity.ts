import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ default: true })
  publised!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  author_id!: number;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author?: User;
}


// Select * from comment left join user on user.id = comment.authore_id left join post on post.id = comment.post_id
// Select * from post left join user on user.id = post.author_id