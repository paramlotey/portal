import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { $Enums } from "@prisma/client";

export const save_draft = async (
  userId: number,
  formType: $Enums.draft_form_type,
  data: Record<string, any>,
  step: number,
) => {
  const draft = await prisma.drafts.upsert({
    where: {
      userId_formType: { userId, formType },
    },
    update: {
      data,
      step,
      updated_at: new Date(),
    },
    create: {
      userId,
      formType,
      data,
      step,
    },
  });

  if (!draft) {
    throw new ApiError(400, "Something went wrong");
  }

  return draft;
};

export const load_draft = async (
  formType: $Enums.draft_form_type,
  userId: number,
) => {
  const draft = await prisma.drafts.findUnique({
    where: {
      userId_formType: { userId, formType },
    },
  });

  return draft ?? null;
};

export const delete_draft = async (
  formType: $Enums.draft_form_type,
  userId: number,
) => {
  await prisma.drafts.delete({
    where: {
      userId_formType: { userId, formType },
    },
  });
  return;
};
