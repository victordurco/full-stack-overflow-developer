CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" varchar(255) NOT NULL,
	"student_token" varchar(255) NOT NULL,
	"tags" varchar(255) NOT NULL,
	"answered" BOOLEAN NOT NULL,
	"submited_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"answer" varchar(255) NOT NULL,
	"answered_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	"answered_by" varchar(255) NOT NULL,
	"question_id" integer NOT NULL,
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("student_token") REFERENCES "users"("token");

ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("answered_by") REFERENCES "users"("token");
ALTER TABLE "answers" ADD CONSTRAINT "answers_fk1" FOREIGN KEY ("question_id") REFERENCES "questions"("id");



