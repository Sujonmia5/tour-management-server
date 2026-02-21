/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import mongoose, { Schema } from "mongoose";
import { TDivision, IDivisionModel } from "./division.interface";

const divisionSchema = new Schema<TDivision, IDivisionModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

divisionSchema.pre("validate", async function () {
  if ((!this.slug || this.slug === "") && this.name) {
    const base = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    this.slug = base;
  }
});

divisionSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as Partial<TDivision>;
  if ((!update.slug || update.slug === "") && update.name) {
    const base = update.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    this.setUpdate({ ...update, slug: base });
  }
});

divisionSchema.pre(/^find/, function (this: mongoose.Query<any, TDivision>) {
  this.where({ isDeleted: { $ne: true } });
});

// divisionSchema.statics.isDivisionExist = async function (slug: string) {
//   const doc = await this.findOne({ slug, isDeleted: false }).select("_id name");
//   if (!doc) return false;
//   return { _id: doc._id.toString(), name: doc.name };
// };

export const DivisionModel = mongoose.model<TDivision, IDivisionModel>(
  "Division",
  divisionSchema,
);
