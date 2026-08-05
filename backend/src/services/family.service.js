import Family from "../models/family.model.js";
import User from "../models/user.model.js";

export const createFamilyService = async (data) => {
  const { familyName, owner, familyImage } = data;

  //   console.log(owner);

  const existFamily = await Family.findOne({ owner });

  if (existFamily) {
    const error = new Error("Already you have a family group");
    error.statusCode = 409;
    throw error;
  }

  const family = await Family.create({
    familyName,
    owner,
    familyImage,
    members: [
      {
        user: owner,
        role: "Owner",
      },
    ],
  });

  await User.findByIdAndUpdate(owner, {
    family: family._id,
  });

  return family;
};

export const addFamilyMemberService = async (data, ownerId) => {
  const { email } = data;
  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const family = await Family.findOne({ owner: ownerId });

  // console.log(family._id);

  if (!family) {
    const error = new Error("Family not found");
    error.statusCode = 404;
    throw error;
  }

  const alreadyMember = family.members.some(
    (member) => member.user.toString() === user._id.toString(),
  );

  if (alreadyMember) {
    const error = new Error("User is already a family member");
    error.statusCode = 409;
    throw error;
  }

  family.members.push({
    user: user._id,
    role: "Member",
  });

  await family.save();

  await User.findByIdAndUpdate(user.id, {
    family: family._id,
  });

  return family;
};

export const getFamilyService = async ({ id }) => {
  const user = await User.findById(id)
    .populate({
      path: "family",
      populate: [
        {
          path: "owner",
          select: "name email profileImage",
        },
        {
          path: "members.user",
          select: "name email profileImage",
        },
      ],
    })
    .lean();

  return user?.family || null;
};

export const getFamilyOwnerService = async (id) => {
  // console.log(id);
  const owner = await Family.findOne({ owner: id });

  // console.log(owner);

  return owner;
};

export const removeMemberService = async (ownerId, memberId) => {
  if (ownerId === memberId) {
    const error = new Error("Can't remove your self");
    error.statusCode = 404;
    throw error;
  }
  const family = await Family.findOne({ owner: ownerId });

  if (!family) {
    const error = new Error("Family not found");
    error.statusCode = 404;
    throw error;
  }

  family.members.pull({ user: memberId });

  await family.save();

  await User.findByIdAndUpdate(memberId, {
    family: null,
  });

  return family;
};
