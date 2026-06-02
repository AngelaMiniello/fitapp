import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne
} from "typeorm";
import { Meal } from "../../meal/entities/meal.entity";
import { Goal } from "../../goal/entities/goal.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals!: Meal[];

  @OneToOne(() => Goal, (goal) => goal.user)
  goal!: Goal;
}