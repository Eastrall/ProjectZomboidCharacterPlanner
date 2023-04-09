import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { v4 as uuid } from "uuid";

import { Character } from "@app/types/character.type";
import { useCharacterService } from "@app/hooks";
import { Occupations } from "@mock/occupations";

describe("hooks -> useCharacterService", () => {
  it("Should create an empty character if no character is provided", () => {
    vi.mock('uuid', () => ({ v4: (): string => "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000" }));
    const expectedCharacter: Character = { id: uuid(), occupation: null, skills: [] };

    const { result } = renderHook(useCharacterService);

    const { character } = result.current;
    expect(character.id).toBe(expectedCharacter.id);
    expect(character.occupation).toBe(expectedCharacter.occupation);
  });

  it("Should set an occupation to the character when setOccupation is called", () => {
    const expectedOccupation = Occupations[1];
    const { result } = renderHook(useCharacterService);

    act(() => result.current.setOccupation(expectedOccupation));

    const { character } = result.current;

    expect(character).not.toBe(null);
    expect(character.occupation).toMatchObject(expectedOccupation);
  });

  it("Should return the remaining points to use when getRemainingPoints is called", () => {
    const expectedOccupation = Occupations[0];
    const expectedRemainingPoints = expectedOccupation.startingPoints;
    const { result } = renderHook(useCharacterService);

    act(() => result.current.setOccupation(expectedOccupation));

    const { character } = result.current;

    expect(character).not.toBe(null);
    expect(result.current.getRemainingPoints()).toBe(expectedRemainingPoints);
  });
});
